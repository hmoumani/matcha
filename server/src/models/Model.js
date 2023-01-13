import { snakeCase } from "snake-case";

class Model {
  constructor(tableName) {
    this.tableName = tableName;
  }

  update(newData, condition) {
    let query = '';
    // partial query build:
    const part1 = `UPDATE ${this.tableName} SET\n`;
    let part2 = '';
    const part3 = '\nWHERE id = ?';

    // placeholder for parameters:
    let params = [];

    // query builder:
    for (let key in newData) {
      part2 += snakeCase(key) + ' = ?, ';
      params.push(newData[key]);
    }
    params.push(condition); // ...and the tuple you want to update

    // finished dynamic SQL query:
    query = part1;
    query += part2.substring(0, part2.length - 2); // snip last comma
    query += part3;

    // params to use:
    console.log(query);
    console.log(params);
    return {query, params}
  }
}

export default Model;
