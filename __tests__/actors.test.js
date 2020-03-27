const request = require('supertest');
const { getActor, getActors } = require('../lib/db/data-helpers');
const app = require('../lib/app');
const Actor = require('../lib/models/Actor');

describe('actor routes', () => {
  it('creates(?) an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'super cool actor',
        dob: '01-24-1990',
        pob: 'Truth or Consequences'  
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'super cool actor',
          dob: expect.any(String),
          pob: 'Truth or Consequences',
          __v: 0
        });
      });
  });
  it('gets all actors', async() => {
    const actors = await getActors();
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors);
      });
  });
  it('it gets actor by id', async() => {
    const actor = await getActor();
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual(actor);
      });
  });
});

