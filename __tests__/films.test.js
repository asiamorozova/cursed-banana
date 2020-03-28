const { getFilm, getFilms, getActor, getStudio, getActors, getReviews } = require('../lib/db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('films tests', () => {
  it('creates a new film', async() => {

    const studio = await getStudio();
    const actor = await getActor();
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'The Long Hair Of Death',
        studio: studio._id,
        released: 1956,
        cast: [{
          role: 'hot victim',
          actor: actor._id
        }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          title: 'The Long Hair Of Death',
          studio: expect.any(String),
          released: 1956,
          cast: [{
            _id: expect.any(String),
            role: 'hot victim',
            actor: expect.any(String)
          }]
        });
      });
  });
  it('gets film by id', async() => {
    const film = await getFilm();
    const studio = await getStudio({ _id: { $in: film.studio } });
    const actors = await getActors({ _id: { $in: film.cast.map(c => c.actor) } });
    const reviews = await getReviews({ film: film._id });
   
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...film,
          studio,
          cast: film.cast.map((c, i) => ({
            ...c, actor: actors[i]
          })),
          reviews
        });
      });
  });
  it('gets all films', async() => {
    const films = await getFilms();
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual(films);
      });
  });
});




