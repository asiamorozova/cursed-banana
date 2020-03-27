//reviews have post, get all, delete routes
const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', (req, res, next) => {
    Review
      .create(req.body)
      .then(Review => res.send(Review))
      .catch(next);
  })

  .get('/', (req, res, next)=> {
    Review
      .find()
      .then(Reviews => res.send(Reviews))
      .catch(next);
  })

  .delete('/:id', (req, res, next)=> {
    Review 
      .findByIdAndDelete(req.params.id)
      .then(Review => res.send(Review))
      .catch(next);
  });
  
