const router = require('express').Router();
const { createReview } = require('../controllers/reviewContorller');
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');

router.route('/')
    .post(createReview);

module.exports = router;