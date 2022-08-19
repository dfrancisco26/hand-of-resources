const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('dogs routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /dogs should return a list of all dogs', async () => {
    const res = await request(app).get('/dogs');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expect.arrayContaining(
      [{ id: '1', name: 'Lucy', age: 5, personality: 'Probably extraterrestrial.', rating: 10 }]
    ));
  });

  it('#GET /dogs/:id should return specific dog', async () => {
    const res = await request(app).get('/dogs/1');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: '1', name: 'Lucy', age: 5, personality: 'Probably extraterrestrial.', rating: 10
    });
  });
});

afterAll(() => {
  pool.end();
});
