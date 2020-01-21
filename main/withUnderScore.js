const _ = require('underscore');
const { sum } = require('../utils/helpers');

const underscorePartial = (data) => {
  const uSum5 = _.partial(sum, 5);
  return uSum5(data);
};

module.exports = { underscorePartial };
