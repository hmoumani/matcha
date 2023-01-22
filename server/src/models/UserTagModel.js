import Model from './Model.js';
import { query as executeQuery } from '../db/index.js';

class UserTagModel extends Model {
  //   tableName = 'user_settings';

  constructor() {
    super('user_tags');
  }

  async insert(userId, tags) {
    let query = `insert into ${this.tableName} `;
    query += `(${Array(1)
        .fill(0)
        .map((el, index) => `user_id, tag_id`)
        .join(', ')}) values `;
    query += `${Array(tags.length)
        .fill(0)
        .map((el, index) => `($1, $${index + 2})`)
        .join(', ')} `;
    query += `on conflict (user_id, tag_id) do NOTHING`;
    const { rows } = await executeQuery(query, [userId, ...tags.map((el) => el.id)]);
  }
}

export default UserTagModel;
