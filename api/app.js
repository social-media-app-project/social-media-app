const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const passport = require('passport');
const compression = require('compression');
const helmet = require('helmet');
const JWTStrategy = require('./strategies/jwt');
const FacebookStrategy = require('./strategies/facebook');

passport.use(JWTStrategy);
passport.use(FacebookStrategy);

const app = express();
app.use(compression());
app.use(helmet());
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
app.use('/users', passport.authenticate(['jwt', { session: false }, 'facebook']), usersRouter);
app.use('/posts', passport.authenticate(['jwt', { session: false }, 'facebook']), postsRouter);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  } else {
    res.status(err.statusCode).send({ errors: err.errors });
  }
});

module.exports = app;
