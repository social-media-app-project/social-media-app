const passport = require('passport');
const v = require('../middleware/validators/AuthValidator');
const q = require('../middleware/query-executors/AuthQueryExecutor');
const { sendResponseOnError } = require('../middleware/validators/util');

exports.jwtSignupPost = [
  ...v.validateSignupBody,
  sendResponseOnError,
  q.saveNewUser,
];

exports.jwtLoginPost = [
  // eslint-disable-next-line consistent-return
  ...v.validateLoginBody,
  sendResponseOnError,
  q.loginUser,
];

exports.googleLogin = [
  passport.authenticate('google', { scope: ['profile', 'email'] }),
];

exports.loginSuccess = [
  (req, res) => {
    if (req.user) {
      res.status(200).set({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': true,
      }).json({
        success: true,
        user: req.user,
      });
    } else {
      res.status(400).json({
        msg: 'the user does not exist',
      });
    }
  },
];

exports.googleCallback = [
  passport.authenticate('google', {
    failureMessage: 'cannot login to google, please try again later',
    failureRedirect: 'http://localhost:3000/login/error',
    successRedirect: 'http://localhost:3000/',
    session: true,
  }),
  (req, res) => {
    console.log('User', req.user);
    res.send('thank you for signing in');
  },
];
