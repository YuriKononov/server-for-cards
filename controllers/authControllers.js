const User = require("../models/user");
const jwt = require('jsonwebtoken');
const { isError } = require("lodash");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };


  if (err.message === 'incorrect email'){
      errors.email = 'that email is not registered';
  }

  if (err.message === 'incorrect password'){
    errors.email = 'that password is incorrect';
}
  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
    });
  }

  return errors;
}

const maxAge = 25920000;
const createToken = (id) => {
    return jwt.sign({ id }, 'full-stack project thats all', {
        expiresIn: maxAge
    });
}

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

//NEW USER
module.exports.signup_post = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await User.create({ email, password, name });
    const token = createToken(user._id);
    //res.header('auth-token', token).send(token);
    res.status(201).json({user : user._id, token});
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    const userData = {
      'authToken': token,
      'email' : user.email,
      '_id' : user._id,
      'name': user.name
    }
    //res.status(201).json({user : user._id, token});
    res.header('auth-token', token).send(userData);
    console.log('logged in!')
  }
  catch(err){
    const errors = handleErrors(err);
    res.status(400).json({errors})
  }
}