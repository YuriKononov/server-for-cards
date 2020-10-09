const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cardRoutes = require('./routes/cardRoutes');

const app = express();

const dbURI = "mongodb+srv://test-user:123qwerty456@cluster0.acaqg.mongodb.net/node-tuts?retryWrites=true&w=majority"
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true})
    .then((result) => app.listen(8080))
    .catch((err) => console.log(err))

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/cards', cardRoutes)