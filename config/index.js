const { resolve } = require('path');
const fs = require('fs');
const { generateData, sizeList, execute } = require('../utils/helpers');
const { underscorePartial, manualPartial } = require('../main/partial');

const dirPath = resolve(__dirname, '../data');

const initialize = () => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdir(dirPath, async (error) => {
      if (error) throw error;
      await generateData(dirPath, sizeList);
      await execute(underscorePartial, dirPath, 'uExecutionTime.txt');
      await execute(manualPartial, dirPath, 'mExecutionTime.txt');
    });
  }
};

try {
  initialize();
} catch (error) {
  console.log(error);
}
