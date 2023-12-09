const router = require('express').Router();
const { getAllProducts } = require('../controllers/productController');
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');

router.route('/all')
    .get(getAllProducts);

module.exports = router;