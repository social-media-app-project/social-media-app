const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('morgan');
const cookieSession = require('cookie-session');
require('dotenv').config();
const passport = require('passport');
const JWTStrategy = require('./strategies/jwt');
require('./strategies/google');

passport.use(JWTStrategy);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['thisisatest'],
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.options('*', cors({
  origin: 'http://localhost:3000',
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authArouter = require('./routes/auth');
const postsRouter = require('./routes/posts');

app.use('/', indexRouter);
app.use('/auth', authArouter);
app.use('/users', passport.authenticate(['jwt', 'google', { session: true }]), usersRouter);
app.use('/posts', passport.authenticate(['jwt', 'google', { session: true }]), postsRouter);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  } else {
    res.status(err.statusCode).send({ errors: err.errors });
  }
});

module.exports = app;
