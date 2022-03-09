const reviews = require('../../db/models/reviews')
const metaData = require('../../db/models/reviewMeta')

exports.getReview = async (req, res) => {
  let { product_id, count, sort, page } = req.query
  count = count || 5
  if(!product_id) return res.end('ERR:: Incorrect product_id')
  if (!['helpful', 'newest', 'relevant'].includes(sort)) return res.end('ERR:: Incorrect sort parameter')
  if (sort === 'newest') {
    const arrayOfReviews = await reviews
      .where('product_id').equals(parseInt(product_id))
      .where('reported').equals(false)
      .select({
        '_id' : 0,
        'product_id' : 0,
        'reported' : 0,
        'reviewer_email' : 0,
        '__v' : 0
      })
      .sort({ date: -1 })
      .limit(count)

    res.json({
      product: product_id,
      page: page || 0,
      results: arrayOfReviews
    })
    return
  }

  const arrayOfReviews = await reviews
    .where('product_id').equals(parseInt(product_id))
    .where('reported').equals(false)
    .select({
      '_id' : 0,
      'product_id' : 0,
      'reported' : 0,
      'reviewer_email' : 0,
      '__v' : 0
    })
    .sort({ helpfulness: -1 })
    .limit(count)

  res.json({
    product: product_id,
    page: page || 0,
    results: arrayOfReviews
  })
}

exports.postReview = async (req, res) => {
  const [getLastReview] = await reviews.find({}).sort({ review_id: -1 }).limit(1)
  const {review_id} = getLastReview
  const {
    product_id,
    rating,
    summary,
    body,
    recommend,
    name,
    email,
    photos,
    characteristics
  } = req.body
  const newReview = new reviews({
    product_id,
    review_id: (review_id + 1),
    rating,
    summary,
    recommend,
    body,
    reviewer_name: name,
    reviewer_email: email,
    photos,
  })
  await newReview.save()

  await metaData.findOneAndUpdate(
    {
      "product_id" : product_id
    },
    {
      $inc: {
        [`ratings.${rating}`]: 1,
        [`recommended.${recommend}`]: 1
      }
    }
  )
  res.status(201)
  res.end()
}

exports.getReviewMeta = async (req, res) => {
  const { product_id } = req.query
  if(!product_id) return res.end('ERR:: Incorrect product_id')
  const reviewMetaData = await metaData.find({ "product_id" : parseInt(product_id) }).select({ '_id' : 0 })
  res.json(reviewMetaData)
}

exports.addHelpfulness = async (req, res) => {
  const { review_id } = req.params
  if(!review_id) return res.end('ERR:: Incorrect review_id')
  await reviews.findOneAndUpdate(
    {
      "review_id" : parseInt(review_id)
    },
    {
      $inc: {
        'helpfulness' : 1
      }
    }
  )
  res.status(204)
  res.end()
}

exports.reportReview = async (req, res) => {
  const { review_id } = req.params
  if(!review_id) return res.end('ERR:: Incorrect review_id')
  await reviews.findOneAndUpdate(
    {
      "review_id" : parseInt(review_id)
    },
    {
      'reported' : true
    }
  )
  res.status(204)
  res.end()
}