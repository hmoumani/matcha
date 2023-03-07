import Model from './Model.js';
import { query as executeQuery } from '../db/index';

class NotificationModel extends Model {
  constructor() {
    super('notifications');
  }
  async find(arg, limit, orderCol) {
    // move this to a decorator
    let conditions = [];
    if (Array.isArray(arg[0])) {
      arg.map((condition) => {
        conditions.push(condition);
      });
    } else {
      conditions = [arg];
    }

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
      let query = `select notifications.id, type, content, seen, concat('http://localhost:1574/public/avatars/', old_image_per_user.value) as avatar from ${this.tableName} 
      LEFT JOIN ${cte_query} ON old_image_per_user.user_id = notifications.sender_id `;
    query += this.buildConditionsQuery(conditions);
    query += this.addLimit(limit);

    const params = conditions.map((condition) => condition[2]);
    const { rows } = await executeQuery(query, params);
    return rows;
    return rows.map((row) => toCamelCase(row));
  }

  
}

export default NotificationModel;
