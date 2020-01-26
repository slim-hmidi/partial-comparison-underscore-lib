/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
const _ = require('underscore');
const R = require('ramda');

const sum = (...args) => args.reduce((acc, curr) => acc += curr, 0);

const underscorePartial = (data) => {
  const uSum5 = _.partial(sum, 5);
  return uSum5(...data);
};

const ramdaPartial = (data) => {
  const rSum5 = R.partial(sum, [5]);
  return rSum5(...data);
};

// eslint-disable-next-line prefer-spread
const partial = (...args) => (others) => sum.apply(null, args.concat(others));

const manualPartial = (data) => {
  const wSum5 = partial(5);
  return wSum5(data);
};

module.exports = {
  underscorePartial, manualPartial, ramdaPartial, sum,
};
