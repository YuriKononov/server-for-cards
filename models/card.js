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
    },
    projects: {
        type: Array
    },
    tags: {
        type: Array
    }
}, {timestamps: true});

const Card = mogoose.model('Card', cardSchema);

module.exports = Card;