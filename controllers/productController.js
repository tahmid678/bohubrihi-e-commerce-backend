const _ = require('lodash');
const { Product, validate } = require('../models/product');
const { Review } = require('../models/review');
const formidable = require('formidable');
const fs = require('fs');

module.exports.createProduct = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send('Something went wrong!');

        // console.log(fields);
        for (key in fields) {
            fields[key] = fields[key][0];
        }

        // console.log(fields);
        const { error } = validate(_.pick(fields, ['name', 'description', 'price', 'category', 'quantity']));
        if (error) return res.status(400).send(error.details[0].message);

        const product = new Product(fields);

        if (files.photo) {
            fs.readFile(files.photo[0].filepath, async (err, data) => {
                if (err) return res.status(400).send('Problem in file data!');
                product.photo.data = data;
                product.photo.contentType = files.photo[0].type;

                try {
                    const result = await product.save();
                    return res.status(201).send({
                        message: 'Product created successfully!',
                        data: _.pick(result, ['name', 'description', 'price', 'category', 'quantity'])
                    })
                } catch (err) {
                    return res.status(500).send('Internal server error!');
                }
            })
        } else {
            return res.status(400).send('No photo provided!');
        }
    })

}

module.exports.getProducts = async (req, res) => {
    console.log(req.query);
    let order = req.query.order === 'desc' ? -1 : 1;
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const products = await Product.find().select({ photo: 0 }).sort({ [sortBy]: order }).limit(limit).skip(skip).populate('category', 'name');
    return res.status(200).send(products);

}

module.exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId).select({ photo: 0 }).populate('category', 'name');
    if (!product) return res.status(404).send('Not found!');
    return res.status(200).send(product);
}

module.exports.getPhoto = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId).select({ photo: 1, _id: 0 });
    console.log(product.photo.contentType);
    res.set('Content-Type', product.photo.contentType);
    return res.status(200).send(product.photo.data);
}

module.exports.updateProductById = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send('Something went wrong!');
        console.log(fields);
        for (key in fields) {
            fields[key] = fields[key][0]
        }
        console.log(fields);
        const updatedFields = _.pick(fields, ['name', 'description', 'price', 'category', 'quantity']);
        _.assignIn(product, updatedFields);

        if (files.photo) {
            fs.readFile(files.photo[0].filepath, (err, data) => {
                if (err) return res.status(400).send('Problem in file data!');
                product.photo.data = data;
                product.photo.contentType = files.photo[0].type;

                try {
                    product.save();
                    return res.status(201).send({
                        message: 'Product updated successfully!',
                    })
                } catch (err) {
                    return res.status(500).send('Internal server error!');
                }
            })
        } else {
            try {
                product.save();
                return res.status(201).send({
                    message: 'Product updated successfully!',
                })
            } catch (err) {
                return res.status(500).send('Internal server error!');
            }
        }
    })
}

module.exports.filterProducts = async (req, res) => {
    let order = req.body.order === 'desc' ? -1 : 1;
    let sortBy = req.body.sortBy ? req.query.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.query.limit) : 10;
    // let skip = parseInt(req.body.skip);
    let filters = req.body.filters;
    let args = {}

    for (let key in filters) {
        if (filters[key].length > 0) {
            if (key === 'price') {
                args['price'] = {
                    $gte: filters['price'][0],
                    $lte: filters['price'][1]

                }
                console.log(args);
            }
            if (key === 'category') {
                args['category'] = {
                    $in: filters['category']
                }
                console.log(args);
            }
        }
    }

    const products = await Product.find(args)
        .select({ photo: 0 })
        .populate('category', 'name')
        .sort({ [sortBy]: order })
        .limit(limit)

    return res.status(200).send(products);
}

module.exports.createReview = async (req, res) => {
    let rev = {};
    rev = _.pick(req.body, ['name', 'review']);
    rev.id = req.params.id;

    const review = new Review(_.pick(rev, ['name', 'review', 'id']));
    console.log(review);

    const result = await review.save();
    return res.status(201).send(result);
}

module.exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).send(products);
}