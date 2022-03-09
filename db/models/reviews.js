const mongoose = require('mongoose')

const reviewsSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: true
  },
  review_id: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  recommend: {
    type: Boolean,
    required: true
  },
  response: {
    type: String,
    default: null
  },
  reported: {
    type: Boolean,
    default: false,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: () => new Date(),
    required: true
  },
  reviewer_name: {
    type: String,
    required: true
  },
  reviewer_email: {
    type: String,
    required: true
  },
  helpfulness: {
    type: Number,
    default: 0,
    required: true
  },
  photos: {
    type: [],
    required: true
  }
})

module.exports = mongoose.model('reviews', reviewsSchema)