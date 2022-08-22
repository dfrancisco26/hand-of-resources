const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('newgames routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /cereals should return list of cereals', async () => {
    const res = await request(app).get('/cereals');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      { id: '1', name: 'Captain Crunch', organic: false, brand: 'Kellogg?' },
      { id: '2', name: 'Blueberry Wheatfuls', organic: true, brand: 'Moms Best Cereals' },
      { id: '3', name: 'Cinnamon Toast Crunch', organic: false, brand: 'General Mills' },
    ]);
  });

  it('#GET cereals/:id should return a cereal with that id', async () => {
    const res = await request(app).get('/cereals/2');
    expect(res.status).toBe(200);
    expect(res.body.organic).toEqual(true);
  });
});

afterAll(() => {
  pool.end();
});

