/* eslint-disable no-param-reassign */
const fs = require('fs');
const { performance } = require('perf_hooks');
const { resolve } = require('path');

// const directoryPath = resolve(__dirname, './data');

const generateRandomData = (size) => {
  if (!size) throw new Error('Size should be a positive number');
  const result = [];
  for (let i = 0; i < size; i += 1) {
    const value = Math.ceil(Math.random(0, 1) * 1000);
    result.push(value);
  }
  return result;
};

const createDataFile = (dirPath, size) => {
  const data = generateRandomData(size);
  const fileName = resolve(dirPath, `./data_${size}.txt`);
  if (fs.existsSync(fileName)) throw new Error('Filename already exists');
  fs.writeFile(fileName, data, {
    encoding: 'utf8',
    flag: 'w',
  }, (error) => {
    if (error) throw error;
    console.log(`data_${size}.txt was created successfully`);
  });
};

const createFiles = (sizeList) => {
  if (sizeList && !sizeList.length) throw new Error('The list of size should not be empty');

  const fileCreationPromises = sizeList.map(async (size) => {
    await createDataFile(size);
  });
  return Promise.all(fileCreationPromises);
};

// eslint-disable-next-line no-return-assign
const sum = (...args) => args.reduce((acc, curr) => acc += curr, 0);

const readDataFromFile = (filename) => {
  if (!filename) throw new Error('No filename was provided');
  const parsedData = fs.readFileSync(filename, {
    encoding: 'utf8',
    falg: 'r',
  });

  const data = parsedData.split(',').map(Number);
  return data;
};

// const isDirectoryEmpty = (dirPath) => {
//   if (!dirPath) throw new Error('Directory path is not valid');
//   const result = fs.readdirSync(dirPath);
//   return !result.length;
// };

const functionExecutionTime = (func, data, label) => {
  if (!func) throw new Error('Function  was not provided');
  if (!data) throw new Error('Data was not provided');
  const start = performance.now();
  func(data);
  const end = performance.now();
  const duration = (end - start).toFixed(3);
  return `Execution time for ${label}: ${duration}ms`;
};

const generateData = (dirPath, sizeList) => {
  if (!dirPath) throw new Error('No directory path was provied');
  if (!sizeList || (sizeList && !sizeList.length)) throw new Error('Size list should not be empty');
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    return createFiles(dirPath, sizeList);
  }
  throw new Error(`${dirPath} already exists`);
};


module.exports = {
  createFiles,
  generateData,
  generateRandomData,
  createDataFile,
  sum,
  // isDirectoryEmpty,
  readDataFromFile,
  functionExecutionTime,
};
