/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const { resolve } = require('path');
const { readDataFromFile, functionExecutionTime } = require('../utils/helpers');
const { manualPartial } = require('../main/withoutUnderscore');
const { underscorePartial } = require('../main/withUnderScore');

const dirPath = resolve(__dirname, '../data');

module.exports.getData = (req, res) => {
  const files = fs.readdirSync(dirPath);
  const uPartialTimes = [];
  const mPartialTimes = [];
  if (files && files.length) {
    for (const file of files) {
      const filename = resolve(dirPath, `./${file}`);
      const parsedData = readDataFromFile(filename);
      const { length } = parsedData;

      uPartialTimes.push({
        label: length,
        value: functionExecutionTime(underscorePartial, parsedData, `UP_${length}`),
      });
      mPartialTimes.push({
        label: length,
        value: functionExecutionTime(manualPartial, parsedData, `MP_${length}`),
      });
    }
  }
  res.status(200).json({
    uPartialTimes,
    mPartialTimes,
  });
};
