const { sum } = require('../utils');

const partial = (...args) => {
  return (...others) => sum.apply(this, args.concat(others))
}

const manualPartial = (data) => {
  const wSum5 = partial(5);
  return wSum5(data);
}

module.exports = { manualPartial }
