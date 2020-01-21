/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const { resolve } = require('path');
const {
  createFiles, isDirectoryEmpty, readDataFromFile, functionExecutionTime,
} = require('./utils/helpers');

const dirPath = resolve(__dirname, './data');
const { manualPartial } = require('./main/withoutUnderscore');
const { underscorePartial } = require('./main/withUnderScore');


const sizeList = [100, 500, 1000, 1500, 2000];

try {
  if (!fs.existsSync(dirPath) && isDirectoryEmpty(dirPath)) {
    createFiles(sizeList);
  }
  const files = fs.readdirSync(dirPath);
  if (files && files.length) {
    for (const file of files) {
      const filename = resolve(__dirname, `./data/${file}`);
      const parsedData = readDataFromFile(filename);
      const { length } = parsedData;

      console.log(functionExecutionTime(underscorePartial, parsedData, `UP_${length}`));
      console.log(functionExecutionTime(manualPartial, parsedData, `MP_${length}`));
    }
  }
} catch (error) {
  console.error(error);
}
