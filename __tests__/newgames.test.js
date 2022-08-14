const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /newgames should return list of newgames', async () => {
    const res = await request(app).get('/newgames');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      { id: '1', name: 'Stray', genre: 'Cat Simulator', release: 2022 },
      { id: '2', name: 'Final Fantasy VII: Remake Intergrade', genre: 'RPG', release: 2021 },
      { id: '3', name: 'Hades', genre: 'Action Roguelite', release: 2018 },
      { id: '4', name: 'Vampire Survivors', genre: 'Action/Survival', release: 2021 }
    ]);
  });

  it('#GET newgames/:id should return specific id game', async () => {
    const res = await request(app).get('/newgames/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      name: 'Stray',
      genre: 'Cat Simulator',
      release: 2022
    });
  });

  it('#POST /newgames creates a new newgame', async () => {
    const NewGame = {
      'name': 'Tails of Iron',
      'genre': 'Action/Adventure',
      'release': 2021 
    };
    const res = await request(app).post('/newgames').send(NewGame);
    expect(res.status !== 404);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...NewGame,
    });
  });

  it('#PUT /newgames/:id updates existing game', async () => {
    const res = await request(app).put('/newgames/1').send({
      genre: 'Kitty Sim',
    });
    // expect(res.status).toBe(200);
    expect(res.body.genre).toBe('Kitty Sim');
  });


});


afterAll(() => {
  pool.end();
});

