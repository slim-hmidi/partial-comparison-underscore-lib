const { resolve } = require('path');
const fs = require('fs');
const { generateData, sizeList, execute } = require('../utils/helpers');
const { underscorePartial, manualPartial, ramdaPartial } = require('../main/partial');

const dirPath = resolve(__dirname, '../data');

const initialize = () => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdir(dirPath, async (error) => {
      if (error) throw error;
      await generateData(dirPath, sizeList);
      await execute(underscorePartial, dirPath, 'uExecutionTime.txt');
      await execute(manualPartial, dirPath, 'mExecutionTime.txt');
      await execute(ramdaPartial, dirPath, 'rExecutionTime.txt');
    });
  }
};

try {
  initialize();
} catch (error) {
  console.log(error);
}
