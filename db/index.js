const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SDC_reviews',
  () => {console.log('Connected to: mongodb://localhost:27017/SDC_reviews')},
  (err) => {console.log('There was a problem connecting to mongo at: mongodb://localhost:27017/SDC_reviews')},
);