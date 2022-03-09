const express = require('express');
const controllers = require('./controllers/ratingsAndReviews')
require('../db/index')
const app = express();
app.use(express.json())
app.get('/reviews', controllers.getReview)
app.post('/reviews', controllers.postReview)
app.get('/reviews/meta', controllers.getReviewMeta)
app.put('/reviews/:review_id/helpful', controllers.addHelpfulness)
app.put('/reviews/:review_id/report', controllers.reportReview)
app.listen(3000, () => console.info('server running on 3000'))