/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
const _ = require('underscore');

const sum = (...args) => args.reduce((acc, curr) => acc += curr, 0);

const underscorePartial = (data) => {
  const uSum5 = _.partial(sum, 5);
  return uSum5(data);
};

const partial = (...args) => (...others) => sum.apply(this, args.concat(others));

const manualPartial = (data) => {
  const wSum5 = partial(5);
  return wSum5(data);
};

module.exports = { underscorePartial, manualPartial };
