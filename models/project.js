const mogoose = require('mongoose');

const Schema = mogoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    devs: {
        type: String,
        required: true
    },
},);

const Project = mogoose.model('Project', projectSchema);

module.exports = Project;