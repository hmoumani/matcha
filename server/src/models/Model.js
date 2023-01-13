import { snakeCase } from 'snake-case';
import { query as executeQuery } from '../db/index';

class Model {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async update(newData, condition) {
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

    // params to use:
    console.log(query);
    console.log(params);
    return await executeQuery(query, params);
  }

  find(condition) {
    const query = `select * from ${this.tableName} `;
    const [col_id, operation, value] = condition;
    query += ` WHERE ${col_id} ${operation} $1`;
    params = [value];
    return query
    // select * from users where username
  }
}

export default Model;
