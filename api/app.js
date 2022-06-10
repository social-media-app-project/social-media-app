const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const JWTStrategy = require('./strategies/jwt');
// Connect to DB
const mongodb = process.env.MONGO_URI;
mongoose.connect(mongodb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'mongo connection error'));

passport.use(JWTStrategy);

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authArouter = require('./routes/auth');
const postsRouter = require('./routes/posts');

app.use('/', indexRouter);
app.use('/auth', authArouter);
app.use('/users', passport.authenticate('jwt', { session: false }), usersRouter);
app.use('/posts', passport.authenticate('jwt', { session: false }), postsRouter);

module.exports = app;
