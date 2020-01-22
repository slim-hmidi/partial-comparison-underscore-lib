/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const { resolve } = require('path');
const { readDataFromFile, functionExecutionTime } = require('../utils/helpers');
const { manualPartial } = require('../main/withoutUnderscore');
const { underscorePartial } = require('../main/withUnderScore');

const dirPath = resolve(__dirname, '../data');

module.exports.getData = (req, res) => {
  const files = fs.readdirSync(dirPath);
  const uPartialtimes = [];
  const mPartialtimes = [];
  if (files && files.length) {
    for (const file of files) {
      const filename = resolve(dirPath, `./${file}`);
      const parsedData = readDataFromFile(filename);
      const { length } = parsedData;

      uPartialtimes.push({
        size: length,
        time: functionExecutionTime(underscorePartial, parsedData, `UP_${length}`),
      });
      mPartialtimes.push({
        size: length,
        time: functionExecutionTime(manualPartial, parsedData, `MP_${length}`),
      });
    }
  }
  res.status(200).json({
    uPartialtimes,
    mPartialtimes,
  });
};
