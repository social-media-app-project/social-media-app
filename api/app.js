var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

//Connect to DB
const mongodb = process.env.MONGO_URI;
mongoose.connect(mongodb,{useUnifiedTopology:true,useNewUrlParser:true});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'mongo connection error'))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authArouter = require('./routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authArouter);

module.exports = app;
