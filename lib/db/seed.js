
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
    pob: chance.city(),
  })));


  const studios = await Studio.create([...Array(3)].map(()=> ({
    name: chance.company(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })
  ));

  const films = await Film.create([...Array(20)].map(() =>({
    title: `Help, my pet ${chance.animal()} is a ${chance.profession()}!`,
    studio: chance.pickone(studios)._id,
    released: chance.year(),
    cast: [
      { role: chance.profession(), actor: chance.pickone(actors)._id },

    ]
  })

  ));
  
  const reviewers = await Reviewer.create([...Array(30)].map(() => ({
    name: chance.name(),
    dob: chance.date(),
    company: chance.company()
  })));

  await Review.create([...Array(100)].map(()=> ({
    rating: chance.integer({
      min: 1,
      max: 5
    }),
    reviewer: chance.pickone(reviewers)._id,
    review: chance.sentence({
      words: 9
    }),
    film: chance.pickone(films)._id

  })));



};
