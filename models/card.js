const mogoose = require('mongoose');

const Schema = mogoose.Schema;

const cardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Card = mogoose.model('Card', cardSchema);

module.exports = Card;