const { Schema, model } = require('mongoose');

module.exports.Review = model('Review', Schema({
    name: 'String',
    id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    review: 'String'
}, { timestaps: true }));