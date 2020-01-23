const request = require('supertest');
const app = require('../app');


describe('App', () => {
  it('Should return successfully the generated data', async () => {
    const { status, body } = await request(app).get('/data');

    expect(status).toBe(200);
    expect(body).toHaveProperty('uPartialtimes');
    expect(body).toHaveProperty('mPartialtimes');
  });
});
