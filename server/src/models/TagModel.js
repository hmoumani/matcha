import Model from './Model.js';
import { query as executeQuery } from '../db/index';

class UserModel extends Model {
  constructor() {
    super('tags');
  }

  async insert(tags) {
    if (tags.length <= 0) {
      return [];
    }
    tags = tags.map((el) => el.toLowerCase());
    tags = new Set(tags);
    const params = [...tags];
    let query = `insert into ${this.tableName} `;
    query += `(${Array(1)
      .fill(0)
      .map((el, index) => `value`)
      .join(', ')}) values `;
    query += `${Array(params.length)
      .fill(0)
      .map((el, index) => `($${index + 1})`)
      .join(', ')} `;
    query += ` on conflict (value) do update set value=EXCLUDED.value RETURNING id`;
    const result = await executeQuery(query, params);
    return result.rows;
  }
}

export default UserModel;
