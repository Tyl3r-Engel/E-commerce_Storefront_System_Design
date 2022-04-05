const mongoose = require('mongoose');
const mongoIP = 'localhost'
mongoose.connect(`mongodb://${mongoIP}:27017/SDC_reviews`,
  () => {console.log(`Connected to: mongodb://${mongoIP}:27017/SDC_reviews`)},
  (err) => {console.log(`There was a problem connecting to mongo at: mongodb://${mongoIP}:27017/SDC_reviews`)},
);