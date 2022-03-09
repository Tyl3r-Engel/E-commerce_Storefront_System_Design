const mongoose = require('mongoose')

const metaDataSchema = new mongoose.Schema({
  characteristics: Object,
  product_id: Number,
  ratings: Object,
  recommended: Object
})

module.exports =  mongoose.model('metaData', metaDataSchema)