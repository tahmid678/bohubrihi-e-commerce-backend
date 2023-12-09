const _ = require('lodash');
const { Product, validate } = require('../models/product');
const { Review } = require('../models/review');
const formidable = require('formidable');
const fs = require('fs');

module.exports.createReview = async (req, res) => {
    let rev = {};
    rev = _.pick(req.body, ['name', 'id', 'review']);

    const review = new Review(rev);
    console.log(review);

    const result = await review.save();
    return res.status(201).send(result);
}