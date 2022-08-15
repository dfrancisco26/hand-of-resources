const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('apples routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /apples should return a list of apples', async () => {
    const res = await request(app).get('/apples');
    expect (res.status).toEqual(200);
    expect(res.body).toEqual([
      { id: '1', name: 'Honeycrisp', color: 'yellow-red', feature: 'Crunch' },
      { id: '2', name: 'Red Delicious', color: 'Red', feature: '?' },
      { id: '3', name: 'Granny Smith', color: 'Green', feature: 'Tartness' }
    ]);
  });
  
  afterAll(() => {
    pool.end();
  });
});
