//studios have post, get all, get by id routes 
const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .post('/', (req, res, next)=> {
    Studio
      .create(req.body)
      .then(Studio => res.send(Studio))
      .catch(next);
  })

  .get('/', (req, res, next)=> {
    Studio
      .find()
      .then(Studios => res.send(Studios))
      .catch(next);
  })

  .get('/:id', (req, res, next)=> {
    console.log(req.params);
    Studio
      .findById(req.params.id)
      .populate('studios')
      .then(Studio => res.send(Studio))
      .catch(next);

  });
