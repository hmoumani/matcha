import Model from './Model.js';
import SettingsModel from './SettingsModel.js';
import { query as executeQuery } from '../db/index';

class UserModel extends Model {
  constructor() {
    super('users');
  }

  async getSuggestedUsers(id) {
    const usetSettingsModel = new SettingsModel();
    const userSetting = await usetSettingsModel.findOne([['user_id', id]]);
    const location = JSON.parse(userSetting.location);
    const query = `
    WITH results AS (
      select users.username,
        users.first_name,
        users.last_name,
        users.age,
        users.fame_rate,
        users.biography,
        users.sexual_orientation,
        users.id,
        users.gender,
        CAST(users.location AS JSON),
        (
          6371 * acos(
            cos(radians(CAST(CAST(location AS JSON)->>'lat' AS double precision))) * cos(radians($6)) *
            cos(radians(CAST(CAST(location AS JSON)->>'lng' AS double precision)) - radians($7)) +
            sin(radians(CAST(CAST(location AS JSON)->>'lat' AS double precision))) * sin(radians($6))
          )
        ) AS distance,
        array_agg(DISTINCT tags.value) AS passions,
        array_agg(DISTINCT images.value) AS avatars
        from ${this.tableName} 
        LEFT JOIN user_tags ON users.id = user_tags.user_id \
        LEFT JOIN tags ON tags.id = user_tags.tag_id \
        LEFT JOIN images ON images.user_id = users.id \
        where users.id != $1
        and age >= $2
        and age <= $3
        and fame_rate >= $4
        and fame_rate <= $5
        GROUP BY users.id 
        )
        SELECT *,
        (
          SELECT count(*) from (
          SELECT unnest(CAST(passions as character varying[])) intersect 
          SELECT unnest(CAST($8 as character varying[]))) as foo
        ) as common_passions_count
      FROM results
      order by common_passions_count desc
    `;
    const params = [id, userSetting.min_age, userSetting.max_age,
      userSetting.min_fame_rating, userSetting.max_fame_rating, location.lat,
      location.lng, JSON.parse(userSetting.common_tags)];

    return executeQuery(query, params);
  }
}

export default UserModel;


// WITH array1 AS (SELECT CAST('{A,B,C}' AS character varying[]) AS arr),
//      array2 AS (SELECT CAST('{B,C,D}' AS character varying[]) AS arr)
// SELECT array1.arr as first, array2.arr as second FROM array1 JOIN array2
// ON array1.arr && array2.arr