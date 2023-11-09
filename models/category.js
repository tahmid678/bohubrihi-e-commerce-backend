const { Schema, model } = require('mongoose');
const Joi = require('joi');

const categorySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const validateCategory = category => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    })

    return schema.validate(category);
}

module.exports.Category = model('Category', categorySchema);
module.exports.validate = validateCategory;