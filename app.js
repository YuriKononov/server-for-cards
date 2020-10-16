const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cardRoutes = require('./routes/cardRoutes');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const postRoute = require('./routes/testPosts')

const app = express();

const dbURI = "mongodb+srv://test-user:123qwerty456@cluster0.acaqg.mongodb.net/node-tuts?retryWrites=true&w=majority"
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true})
    .then((result) => app.listen(8080))
    .catch((err) => console.log(err))

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(postRoute);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/cards', cardRoutes)
app.use('/projects', projectRoutes)
app.use(authRoutes)

