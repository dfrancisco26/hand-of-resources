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

  it('#GET apples/:id should return specific apple', async () => {
    const res = await request(app).get('/apples/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      name: 'Honeycrisp',
      color: 'yellow-red',
      feature: 'Crunch'
    });
  });
  
  it('#POST /apples creates a new apple', async () => {
    const Apple = {
      'name': 'Gala',
      'color': 'red-yellow',
      'feature': 'shelf life'
    };
    const res = await request(app).post('/apples').send(Apple);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...Apple,
    });
  });

  
  it('#PUT /apples/:id updates an existing apple', async () => {
    const res = await request(app).put('/apples/1').send({
      name: 'Honey Crisp',
    });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Honey Crisp');
  });
  
  afterAll(() => {
    pool.end();
  });
});
