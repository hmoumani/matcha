import _ from 'lodash';

export const toCamelCase = (obj) =>
  _.reduce(
    obj,
    (result, value, key) => {
      result[_.camelCase(key)] = value;
      return result;
    },
    {}
  );
