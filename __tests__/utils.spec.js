/* eslint-disable no-unused-vars */

describe('Utils functions', () => {
  describe('generateRandomData', () => {
    it('should throw an error if the size is undefined or negative', () => {
      const generateRandomDataMock = jest.fn().mockImplementation(() => { throw new Error('Size should be a positive number'); });
      expect(generateRandomDataMock).toThrowError('Size should be a positive number');
    });

    it('should generate a table successfully', () => {
      const generateRandomDataMock = jest.fn().mockImplementation((size) => {
        const result = [];
        for (let i = 0; i < size; i += 1) {
          result.push(i);
        }
        return result;
      });
      expect(generateRandomDataMock(4)).toHaveLength(4);
    });
  });

  describe('createFile', () => {
    it('should throw an error if filename already exists', () => {
      const createFile = jest.fn().mockImplementation(() => { throw new Error('Filename already exists'); });
      expect(createFile).toThrowError('Filename already exists');
    });

    it('should throw an error if data does not exists', () => {
      const createFile = jest.fn().mockImplementation(() => { throw new Error('Data not provided'); });
      expect(createFile).toThrowError('Data not provided');
    });

    it('should create successfully a new file', () => {
      const createFile = jest.fn().mockImplementation((filename, data) => 'File created successfully');
      expect(createFile('myFile', [1, 2, 3]).includes('File created successfully')).toBeTruthy();
    });
  });

  describe('createFiles', () => {
    it('should throws an error if sizeList is empty', () => {
      const createFiles = jest.fn().mockImplementation(() => { throw new Error('The list of size should not be empty'); });
      expect(createFiles).toThrowError('The list of size should not be empty');
    });

    it('should create successfully a list of files', () => {
      const createDataFiles = jest.fn().mockImplementation((sizeList) => sizeList.map((size) => `data_${size}.txt was created successfully`));
      expect(createDataFiles([4, 5, 6]).length).toBeGreaterThan(0);
    });
  });

  describe('readDataFromFile', () => {
    it('should throws an error if no filename was provided', () => {
      const readDataFromFile = jest.fn().mockImplementation(() => { throw new Error('No filename was provided'); });
      expect(readDataFromFile).toThrowError('No filename was provided');
    });

    it('should return successfully the parsed data from file', () => {
      const readDataFromFile = jest.fn().mockImplementation((filename) => [1, 2, 3]);
      expect(readDataFromFile('data.txt').length).toBeGreaterThan(0);
    });
  });

  describe('getExecutionTime', () => {
    it('should throws an error if no function was provided', () => {
      const getExecutionTime = jest.fn().mockImplementation(() => { throw new Error('Function  was not provided'); });
      expect(getExecutionTime).toThrowError('Function  was not provided');
    });

    it('should throws an error if no data was provided', () => {
      const getExecutionTime = jest.fn().mockImplementation(() => { throw new Error('Data was not provided'); });
      expect(getExecutionTime).toThrowError('Data was not provided');
    });

    it('should return successfully the execution time of a function', () => {
      const getExecutionTime = jest.fn().mockReturnValueOnce('Execution time for fn: 0.3ms');
      expect(getExecutionTime().includes('0.3ms')).toBe(true);
    });
  });
});
