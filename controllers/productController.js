const _ = require('lodash');
const { Product, validate } = require('../models/product');
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
                product.photo.contentType = files.photo.type;

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
    const products = await Product.find().select({ photo: 0 });
    return res.status(200).send(products);

}

module.exports.getProductById = async (req, res) => {

}

module.exports.updateProductById = async (req, res) => {

}