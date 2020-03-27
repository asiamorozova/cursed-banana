
const chance = require('chance').Chance();
const Actor = require('../models/Actor');
const Studio = require('../models/Studio');
const Film = require('../models/Film');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');

module.exports = async() => { 
  const actors = await Actor.create([...Array(10)].map(()=> ({
    name: chance.name(),
    dob: chance.date(), 
    pob: chance.city()
  })));
};

