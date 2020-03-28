const request = require('supertest'); 
const { getStudio, getStudios } = require('../lib/db/data-helpers');
const app = require('../lib/app');
const Studio = require('../lib/models/Studio');

describe('studio routes', () => {
  it('conjures up a studio using ancient spells', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'I ate a banana Studio',
        address: {
          city: 'Screamer',
          state: 'Alabama',
          country: 'this one',
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'I ate a banana Studio',
          address: {
            city:'Screamer',
            state: 'Alabama',
            country: 'this one'
          },
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it ('summons all studios', async() => {
    const studios = await getStudios();
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual(studios);
      });
  });
  it('it gets studio by id', async() => {
    const studio = await getStudio();
    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          name: studio.name,
          address: {
            city: studio.address.city,
            state: studio.address.state,
            country: studio.address.country
          },
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
