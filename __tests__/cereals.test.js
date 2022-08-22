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

  it('#POST /cereals creates new cereal', async () => {
    const Cereal = {
      'name': 'Some fancy granola',
      'organic': true,
      'brand': 'expensive',
    };
    const res = await request(app).post('/cereals').send(Cereal);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...Cereal,
    });
  });

  it('#PUT /cereals/:id updates a cereal', async () => {
    const res = await request(app).put('/cereals/1').send({
      brand: 'Post??',
    });
    expect(res.status).toBe(200);
    expect(res.body.brand).toBe('Post??');
  });

  it('#DELETE /cereals/:id deletes cereal', async () => {
    await request(app).delete('/cereals/1');
    const res = await request(app).get('/cereals/1');
    expect(res.status).toBe(404);
  });
});

afterAll(() => {
  pool.end();
});

