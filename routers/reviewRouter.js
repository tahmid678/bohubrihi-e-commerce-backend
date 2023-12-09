const router = require('express').Router();
const { createReview, getReviews } = require('../controllers/reviewContorller');
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');

router.route('/')
    .post(createReview)
    .get(getReviews);

module.exports = router;