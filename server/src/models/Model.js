import { snakeCase } from 'snake-case';
import { query as executeQuery } from '../db/index';

class Model {
  constructor(tableName) {
    this.tableName = tableName;
  }

  update(newData, condition) {
    let query = '';
    // partial query build:
    const part1 = `UPDATE ${this.tableName} SET `;
    let part2 = '';

    // placeholder for parameters:
    let params = [];

    // query builder:
    let index = 1;
    for (const key in newData) {
      part2 += snakeCase(key) + ` = $${index}, `;
      index++;
      params.push(newData[key]);
    }

    // finished dynamic SQL query:
    query = part1;
    query += part2.substring(0, part2.length - 2); // snip last comma

    if (condition) {
      const [col_id, operation, value] = condition;
      const part3 = ` WHERE ${col_id} ${operation} $${index}`;
      query += part3;
      params.push(value); // ...and the tuple you want to update
    }

    return executeQuery(query, params);
  }

  async find(condition) {
    let query = `select * from ${this.tableName} `;
    const [col_id, operation, value] = condition;
    query += `WHERE ${col_id} ${operation} $1`;
    const params = [value];
    const { rows } = await executeQuery(query, params);

    return rows;
  }

  async findOne(condition){
    const rows = await this.find(condition);
    return rows[0];
  }

  insert(data) {
    const params = Object.values(data);

    let query = `insert into ${this.tableName} `;
    const cols = Object.keys(data);
    query += `(${cols.map((el) => snakeCase(el)).join(', ')}) values `;
    query += `(${Array(cols.length)
      .fill(0)
      .map((el, index) => `$${index + 1}`)
      .join(', ')})`;

    return executeQuery(query, params);
  }

  delete(condition) {
    let query = `delete from ${this.tableName} `;
    const [col_id, operation, value] = condition;
    query += `WHERE ${col_id} ${operation} $1`;
    const params = [value];
    return executeQuery(query, params);
  }
}

// let data = {
//   minAge: 18,
//   maxAge: 18,
//   maxFameRating: 10,
//   location: 'hell WPOR',
//   commonTags: '4'
// };

// new Model('user_settings').insert(data);

export default Model;
