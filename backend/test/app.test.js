const request = require('supertest');
const app = require('../index');

describe('GET /', () => {
  it('responds hello', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});
