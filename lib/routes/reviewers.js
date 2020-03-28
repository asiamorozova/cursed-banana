//reviewers have post, get all, get by id , and patch routes
const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', (req, res, next) => {
    Reviewer
      .crete(req.body)
      .then(Reviewer => res.send(Reviewer))
      .catch(next);
  })

  .get('/', (req, res, next)=> {
    Reviewer
      .find()
      .then(Reviewers => res.send(Reviewers)) 
      .catch(next);

  })

  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .populate('reviews')
      .populate('film')
      .then(Reviewer => res.send(Reviewer))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('reviews')
      .then(reviewer => {
        if(reviewer.reviews.length) return res.send({ 'error': 'Cannot be deleted' });
        reviewer.deleteOne()
          .then(deleted => res.send(deleted));
      })
      .catch(next);
  });
  

