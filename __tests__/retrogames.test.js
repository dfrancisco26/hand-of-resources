const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('retrogames routes', () => {
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
  it('#POST /retrogames creates a new retrogame object', async () => {
    const RetroGame = {
      'name': 'Twisted Metal',
      'genre': 'Vehicular Combat',
      'release': 1995
    };

    const res = await request(app).post('/retrogames').send(RetroGame);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: expect.any(String), ...RetroGame });
  });

  it('#PUT /retrogames/:id updates existing retrogame key and value', async () => {
    const res = await request(app).put('/retrogames/2').send({
      name: 'Pocket Monsters Red'
    });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Pocket Monsters Red');
  });

  it('#DELETE /retrogames/:id deletes retrogame object', async () => {
    await request(app).delete('/retrogames/2');
    const resp = await request(app).get('/retrogames/2');
    expect(resp.status).toBe(404);
  });
});


afterAll(() => {
  pool.end();
});
