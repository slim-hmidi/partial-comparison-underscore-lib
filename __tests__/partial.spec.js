const {
  ramdaPartial, underscorePartial, manualPartial, sum,
} = require('../main/partial');

describe('sum', () => {
  it('Should sum a two numbers successfully', () => {
    expect(sum(2, 5)).toBe(7);
  });
  it('Should sum a list of numbers successfully', () => {
    expect(sum(1, 2, 3)).toBe(6);
  });
});

describe('manual partial', () => {
  it('Should sum a number + 5 successfully', () => {
    expect(manualPartial(2)).toBe(7);
  });
  it('Should sum a list of numbers successfully', () => {
    const data = [1, 2, 3];
    expect(manualPartial(data)).toBe(11);
  });
});


describe('underscore', () => {
  it('Should sum a number + 5 successfully', () => {
    expect(underscorePartial([2])).toBe(7);
  });

  it('Should sum a number + 5 successfully', () => {
    expect(underscorePartial([2, 3])).toBe(10);
  });
});


describe('Ramda', () => {
  it('Should sum a number + 5 successfully', () => {
    expect(ramdaPartial([2])).toBe(7);
  });

  it('Should sum a number + 5 successfully', () => {
    expect(ramdaPartial([2, 3])).toBe(10);
  });
});
