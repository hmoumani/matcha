import Model from './Model.js';
import SettingsModel from './SettingsModel.js';
import { query as executeQuery } from '../db/index';

class UserModel extends Model {
  constructor() {
    super('users');
  }

  async userDesiredGenderQuery(sexual_orientation) {
    return `${!sexual_orientation || sexual_orientation === 'both' ? '' : ` and gender = '${sexual_orientation}'`}`;
  }

  async getSuggestedUsers(id) {
    const userModel = new UserModel();
    const user = await userModel.findOne(['id', '=', id]);
    
    const usetSettingsModel = new SettingsModel();
    const userSetting = await usetSettingsModel.findOne([['user_id', id]]);
    const location = JSON.parse(userSetting.location);
    const tags = userSetting.common_tags ?? user.common_tags;
    const common_tags = JSON.parse(tags ?? '[]');
    let query = `
    WITH results AS (
      select users.username,
        first_name,
        last_name,
        age,
        fame_rate,
        biography,
        sexual_orientation,
        users.id,
        gender,
        CAST(users.location AS JSON),
        (
          6371 * acos(
            cos(radians(CAST(CAST(location AS JSON)->>'lat' AS double precision))) * cos(radians($6)) *
            cos(radians(CAST(CAST(location AS JSON)->>'lng' AS double precision)) - radians($7)) +
            sin(radians(CAST(CAST(location AS JSON)->>'lat' AS double precision))) * sin(radians($6))
          )
        ) AS distance,
        array_agg(DISTINCT tags.value) AS passions,
        array_agg(DISTINCT concat('http://localhost:1574/public/avatars/', images.value)) AS avatars
        from ${this.tableName} 
        LEFT JOIN user_tags ON users.id = user_tags.user_id \
        LEFT JOIN tags ON tags.id = user_tags.tag_id \
        LEFT JOIN images ON images.user_id = users.id \
        where users.id != $1
        ${await this.userDesiredGenderQuery(user.sexual_orientation)}
        and age >= $2
        and age <= $3
        and fame_rate >= $4
        and fame_rate <= $5
        and (select count(*) from user_likes where liker_id = $1 and liked_id = users.id) = 0
        and (select count(*) from blocked_users where (blocker_id = $1 and blocked_id = users.id) or (blocked_id = $1 and blocker_id = users.id)) = 0
        GROUP BY users.id 
        )
        SELECT *,
        (
          SELECT count(*) from (
          SELECT unnest(CAST(passions as character varying[])) intersect 
          SELECT unnest(CAST($8 as character varying[]))) as foo
        ) as common_passions_count
      FROM results
    `;
    query += this.orderUsersBy(userSetting.sort_by);
    const params = [id, userSetting.min_age, userSetting.max_age,
      userSetting.min_fame_rating, userSetting.max_fame_rating, location.lat,
      location.lng, common_tags];
    return executeQuery(query, params);
  }

  orderUsersBy(orderOption) {
    if (!orderOption) {
      return ` ORDER BY 1 * ($3 - age) + 1 * (1 - (distance / 100000)) + 1 * fame_rate + 1 * (
          SELECT count(*) from (
          SELECT unnest(CAST(passions as character varying[])) intersect 
          SELECT unnest(CAST($8 as character varying[]))) as foo
        ) DESC`;
    } else if (['common_passions_count', 'fame_rate'].includes(orderOption)) {
      return ` ORDER BY ${orderOption} DESC`;
    }
    return ` ORDER BY ${orderOption} ASC`;
  }

  async getUserChats(userId) {
    const current_user = await this.findOne(['id', '=', userId]);
    const location = JSON.parse(current_user.location);
    let cte_query = `(SELECT i.user_id, i.value, i.created_at
      FROM images i
      JOIN (
          SELECT user_id, MIN(created_at) AS oldest_image_date
          FROM images
          GROUP BY user_id
        ) oldest_dates
        ON i.user_id = oldest_dates.user_id AND i.created_at = oldest_dates.oldest_image_date AND i.id = (
          SELECT MIN(id) FROM images
          WHERE user_id = oldest_dates.user_id AND created_at = oldest_dates.oldest_image_date
        )
      order by i.user_id DESC) as old_image_per_user`;
    return executeQuery(`SELECT 
        json_build_object(
          'firstName', u.first_name,
          'lastName', u.last_name,
          'age', u.age,
          'id', u.id,
          'distance', (
              6371 * acos(
                  cos(radians(CAST(CAST(location AS JSON)->>'lat' AS double precision))) * cos(radians($2)) *
                  cos(radians(CAST(CAST(location AS JSON)->>'lng' AS double precision)) - radians($3)) +
                  sin(radians(CAST(CAST(location AS JSON)->>'lat' AS double precision))) * sin(radians($2))
              )
          ),
          'biography', u.biography,
          'avatar', concat('http://localhost:1574/public/avatars/', old_image_per_user.value),
          'passions', array_agg(DISTINCT tags.value)
      ) AS user,
      json_build_object(
          'message', c.message,
          'created_at', c.created_at
      ) AS lastMessage
      FROM users u
      LEFT JOIN user_tags ON u.id = user_tags.user_id \
      LEFT JOIN tags ON tags.id = user_tags.tag_id
      INNER JOIN user_likes l1 ON l1.liked_id = u.id AND l1.liker_id = $1
      INNER JOIN user_likes l2 ON l2.liker_id = u.id AND l2.liked_id = $1
      LEFT JOIN LATERAL (
        SELECT id as chat_id, sender_id, receiver_id, created_at, message
        FROM messages
        WHERE (sender_id = $1 AND receiver_id = u.id) OR (sender_id = u.id AND receiver_id = $1)
        ORDER BY created_at DESC
        LIMIT 1
      ) c ON (c.sender_id = $1 AND c.receiver_id = u.id) OR (c.sender_id = u.id AND c.receiver_id = $1)
      LEFT JOIN ${cte_query} ON old_image_per_user.user_id = u.id
      where (select count(1) from blocked_users where (blocker_id = $1 and blocked_id = u.id) or (blocked_id = $1 and blocker_id = u.id)) = 0
      GROUP BY u.id, c.chat_id, c.created_at, c.message, old_image_per_user.value
      order by c.created_at ASC
      `, [userId, location.lat, location.lng]);    
  }
  async getChatMessages(currentUserId, chatUserId) {
    const query = `
      select sender_id, receiver_id, message, created_at
      from messages
      where (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
      order by created_at ASC
    `
    return executeQuery(query, [currentUserId, chatUserId]);
  }
  async searchUsers(keyword, userId) {
    let cte_query = `(SELECT i.user_id, i.value, i.created_at
      FROM images i
      JOIN (
          SELECT user_id, MIN(created_at) AS oldest_image_date
          FROM images
          GROUP BY user_id
        ) oldest_dates
        ON i.user_id = oldest_dates.user_id AND i.created_at = oldest_dates.oldest_image_date AND i.id = (
          SELECT MIN(id) FROM images
          WHERE user_id = oldest_dates.user_id AND created_at = oldest_dates.oldest_image_date
        )
      order by i.user_id DESC) as old_image_per_user`;

    const query_string = `SELECT \
      users.id, \
      users.first_name, \
      users.last_name, \
      concat('http://localhost:1574/public/avatars/', old_image_per_user.value) as avatar
      FROM users \
      LEFT JOIN ${cte_query} ON old_image_per_user.user_id = users.id
      WHERE (users.first_name ILIKE $1 OR users.last_name ILIKE $1 \
      OR users.first_name || ' ' || users.last_name ILIKE $1 \
      OR users.last_name || ' ' || users.first_name ILIKE $1 \
      OR users.username ILIKE $1)
      AND (select count(1) from blocked_users where (blocker_id = $2 and blocked_id = users.id) or (blocked_id = $2 and blocker_id = users.id)) = 0
      AND users.id != $2
      LIMIT 10
      `;
    const sanitized_keyword = `%${keyword.replaceAll('_', '\\_').replaceAll('%', '\\%')}%`; // Sanitize and escape the keyword
    return executeQuery(query_string, [sanitized_keyword, userId]);
  }
}
export default UserModel;
