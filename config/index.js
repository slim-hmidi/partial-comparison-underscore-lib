const { resolve } = require('path');
const { generateData, sizeList } = require('../utils/helpers');

const dirPath = resolve(__dirname, '../data');

const initialize = () => {
  generateData(dirPath, sizeList);
};

try {
  initialize();
} catch (error) {
  console.log(error);
}
