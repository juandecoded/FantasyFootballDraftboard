// util function to convert snake_case to camelCase

const toCamelCase = (str) => {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
};

const mapKeysToCamelCase = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[toCamelCase(key)] = obj[key];
    return acc;
  }, {});
};

module.exports = mapKeysToCamelCase;