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

  it('#POST /dogs creates new dog', async () => {
    const Dog = {
      'name': 'Elton',
      'age': 2,
      'personality': 'Baby dog chases bad goat.',
      'rating': 10
    };
    const res = await request(app).post('/dogs').send(Dog);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...Dog,
    });
  });

  it('#PUT /dogs/:id updates dog info', async () => {
    const res = await request(app).put('/dogs/1').send({
      name: 'Wuwu',
    });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Wuwu');
  });

  it('#DELETE /dogs/:id deletes dog with that id', async () => {
    await request(app).delete('/dogs/2');
    const res = await request(app).get('/dogs/2');
    expect(res.status).toBe(404);
  });
});

afterAll(() => {
  pool.end();
});
