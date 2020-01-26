/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
const fs = require('fs');
const { performance } = require('perf_hooks');
const path = require('path');

const generateRandomData = (size) => {
  if (!size) throw new Error('Size should be a positive number');
  const result = [];
  for (let i = 0; i < size; i += 1) {
    const value = Math.ceil(Math.random(0, 1) * 1000);
    result.push(value);
  }
  return result;
};

const createFile = (fileName, data) => {
  if (fs.existsSync(fileName)) throw new Error('Filename already exists');
  if (!data) throw new Error('Data not provided');
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, {
      encoding: 'utf8',
      flag: 'w',
    }, (error) => {
      if (error) reject(error);
      console.log('File created successfully');
      resolve(null);
    });
  });
};

const createFiles = (dirPath, sizeList) => {
  if (sizeList && !sizeList.length) throw new Error('The list of size should not be empty');

  const fileCreationPromises = sizeList.map(async (size) => {
    const data = generateRandomData(size);
    const fileName = path.resolve(dirPath, `./data_${size}.txt`);
    await createFile(fileName, data);
  });
  return Promise.all(fileCreationPromises);
};

const readDataFromFile = (filename) => {
  if (!filename) throw new Error('No filename was provided');
  const parsedData = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
  return parsedData;
};

const getExecutionTime = (func, data) => {
  if (!func) throw new Error('Function  was not provided');
  if (!data) throw new Error('Data was not provided');
  const start = performance.now();
  func(data);
  const end = performance.now();
  const duration = (end - start).toFixed(3);
  return duration;
};

const execute = async (func, dirPath, label) => {
  const files = fs.readdirSync(dirPath);
  const result = [];
  if (files && files.length) {
    for (const file of files) {
      const filename = path.resolve(dirPath, `./${file}`);
      const parsedData = readDataFromFile(filename);
      const data = parsedData.split(',').map((d) => Number(d));
      const { length } = data;
      result.push({
        label: length,
        value: getExecutionTime(func, data),
      });
    }
  }
  await createFile(path.resolve(dirPath, `./${label}`), JSON.stringify(result));
};


const generateData = async (dirPath, sizeList) => {
  if (!dirPath) throw new Error('No directory path was provied');
  if (!sizeList || (sizeList && !sizeList.length)) throw new Error('Size list should not be empty');
  await createFiles(dirPath, sizeList);
};

const sizeList = [500, 1000, 1500, 2000, 2500, 3000];


module.exports = {
  createFiles,
  generateData,
  generateRandomData,
  createFile,
  readDataFromFile,
  getExecutionTime,
  execute,
  sizeList,
};
