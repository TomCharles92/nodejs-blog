const {
  add,
  mul
} = require("./a");
const _ = require("lodash");

const sum = add(5, 10);
console.log(sum);

const result = mul(1920, 1080);
console.log(result);

const array = _.concat([1, 23], [3]);
console.log(array)