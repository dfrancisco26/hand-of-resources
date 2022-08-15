const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /retrogames should return list of retrogames', async () => {
    const res = await request(app).get('/retrogames');
    expect(res.status === 200);
    expect(res.body).toEqual([
      { id: '1', name: 'Legend of Dragoon', genre: 'JRPG', release: 1999 },
      { id: '2', name: 'Pokémon Red', genre: 'Adventure/JRPG', release: 1996 },
      { id: '3', name: 'Syphon Filter', genre: 'Stealth Shooter', release: 1999 },
      { id: '4', name: 'Gran Turismo 2', genre: 'Racing Simulator', release: 1999 }
    ]);
  });

  it('#GET /retrogames/:id should return a specific retrogame', async () => {
    const res = await request(app).get('/retrogames/3');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '3',
      name: 'Syphon Filter',
      genre: 'Stealth Shooter',
      release: 1999 
    });
  });

});


afterAll(() => {
  pool.end();
});
