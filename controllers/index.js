/* eslint-disable no-restricted-syntax */
const { resolve } = require('path');
const { readDataFromFile } = require('../utils/helpers');

const dirPath = resolve(__dirname, '../executionTime');

module.exports.getData = (req, res) => {
  const ufilename = resolve(dirPath, './uExecutionTime.txt');
  const rfilename = resolve(dirPath, './rExecutionTime.txt');
  const mfilename = resolve(dirPath, './mExecutionTime.txt');
  const uPartialTimes = JSON.parse(readDataFromFile(ufilename));
  const mPartialTimes = JSON.parse(readDataFromFile(mfilename));
  const rPartialTimes = JSON.parse(readDataFromFile(rfilename));
  return res.status(200).json({
    rPartialTimes,
    uPartialTimes,
    mPartialTimes,
  });
};
