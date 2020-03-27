//films get post, get all, get by id routes 

const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router() 
  .post('/', (req, res, next)=> {
    Film
      .create(req.body)
      .then(Film => res.send(Film))
      .catch(next);
  })

  .get('/', (req, res, next)=> {
    Film
      .find()
      .then(Films => res.send(Films))
      .catch(next);
  })

  .get('/:id', (req, res, next)=> {
    Film
      .findById(req.params.id)
      .populate('films')
      .then(Film => res.send(Film))
      .catch(next);
  });
