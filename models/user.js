const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: [true,'Please, enter email'],
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password : {
        type: String,
        required: [true,'Please enter a password'],
        minlength: [4,'Min length is 4 characters']
    },
    name : {
        type: String,
        required: true
    }
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}


userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;