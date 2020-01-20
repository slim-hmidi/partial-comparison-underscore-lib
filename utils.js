const fs = require('fs');
const { performance } = require("perf_hooks");
const { resolve } = require('path');
const directoryPath = resolve(__dirname, './data');

const generateRandomData = (size) => {
  if (!size) throw new Error('Size should be a positive number');
  let result = [];
  for (let i = 0; i < size; i++) {
    const value = Math.ceil(Math.random(0, 1) * 1000);
    result.push(value)
  }
  return result;
}

const createDataFile = (size) => {
  const data = generateRandomData(size);
  const fileName = resolve(directoryPath, `./data_${size}.txt`);
  if (fs.existsSync(fileName)) throw new Error('Filename already exists');
  fs.writeFile(fileName, data, {
    encoding: 'utf8',
    flag: 'w',
  }, (error) => {
    if (error) throw error;
    console.log(`data_${size}.txt was created successfully`)
  })
}

const createFiles = async (sizeList) => {
  if (sizeList && !sizeList.length) throw new Error('The list of size should not be empty');

  const fileCreationPromises = sizeList.map(async (size) => await createDataFile(size));
  return Promise.all(fileCreationPromises)
}

const sum = (...args) => {
  return args.reduce((acc, curr) => acc += curr, 0)
};

const readDataFromFile = (filename) => {
  if (!filename) throw new Error('No filename was provided')
  const parsedData = fs.readFileSync(filename, {
    encoding: 'utf8',
    falg: 'r'
  });

  const data = parsedData.split(',').map(Number);
  return data;
}

const isDirectoryEmpty = (directoryPath) => {
  if (!directoryPath) throw new Error('Directory path is not valid');
  const result = fs.readdirSync(directoryPath)
  return !result.length
}

const functionExecutionTime = (func, data, label) => {
  if (!func) throw new Error('Function  was not provided')
  if (!data) throw new Error('Data was not provided')
  const start = performance.now();
  func(data)
  const end = performance.now();
  const duration = (end - start).toFixed(3);
  return `Execution time for ${label}: ${duration}ms`;
}


module.exports = {
  createFiles,
  generateRandomData,
  createDataFile,
  sum,
  isDirectoryEmpty,
  readDataFromFile,
  functionExecutionTime
}
