const router = require('express').Router();
const { createReview, getReviews } = require('../controllers/reviewContorller');
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');

router.route('/')
    .post(createReview);

router.route('/:id')
    .get(getReviews);

module.exports = router;