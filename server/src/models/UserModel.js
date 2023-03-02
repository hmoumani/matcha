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
    const common_tags = JSON.parse(userSetting.common_tags ?? user.common_tags);
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
}
export default UserModel;
