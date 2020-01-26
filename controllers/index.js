/* eslint-disable no-restricted-syntax */
const { resolve } = require('path');
const { readDataFromFile } = require('../utils/helpers');

const dirPath = resolve(__dirname, '../data');

module.exports.getData = (req, res) => {
  const ufilename = resolve(dirPath, './uExecutionTime.txt');
  const mfilename = resolve(dirPath, './mExecutionTime.txt');
  const uPartialTimes = JSON.parse(readDataFromFile(ufilename));
  const mPartialTimes = JSON.parse(readDataFromFile(mfilename));
  return res.status(200).json({
    uPartialTimes,
    mPartialTimes,
  });
};
