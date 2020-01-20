const _ = require("underscore");
const { sum } = require('../utils');

const underscorePartial = (data) => {
  const uSum5 = _.partial(sum, 5);
  return uSum5(data);
}

module.exports = { underscorePartial }