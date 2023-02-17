import _ from 'lodash';
import { snakeCase } from 'snake-case';
import { toCamelCase } from '../utils/transformers';
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

  buildConditionsQuery(conditions) {
    let query = '';
    if (!conditions) return '';
    query += 'WHERE ';
    conditions.forEach((condition, index) => {
      if (condition.length === 2) {
        condition.splice(1, 0, '=');
      }
      const [colName, operation] = condition;
      query += `${snakeCase(colName)} ${operation} $${index + 1}`;
      if (index < conditions.length - 1) {
        query += ' AND ';
      }
    });
    return query;
  }

  addLimit(limit) {
    if (!limit) return '';
    return ` LIMIT ${limit}`;
  }

  orderBy(orderOption) {
    if (!orderOption) return '';
    return `ORDER BY ${orderOption}`;
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

    let query = `select * from ${this.tableName} `;
    query += this.buildConditionsQuery(conditions);
    query += this.orderBy(orderCol);
    query += this.addLimit(limit);

    const params = conditions.map((condition) => condition[2]);
    console.log({ query, params });
    // console.log({ params });
    const { rows } = await executeQuery(query, params);
    // console.log({ rows });
    return rows;
    return rows.map((row) => toCamelCase(row));
  }

  async findOne(...args) {
    const rows = await this.find(...args);
    return rows ? rows[0] : null;
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

  delete(conditions) {
    let query = `delete from ${this.tableName} `;
    if (conditions.length > 0) {
      query += 'WHERE ';
      conditions.forEach((condition, index) => {
        const [col_id, operation] = condition;
        query += `${col_id} ${operation} $${index + 1}`;
        if (index < conditions.length - 1) {
          query += ' AND ';
        }
      });
    }
    const params = conditions.map((condition) => condition[2]);
    return executeQuery(query, params);
  }
}

export default Model;
