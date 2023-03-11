const v = require("../middleware/validators/AuthValidator");
const q = require("../middleware/query-executors/AuthQueryExecutor");
const { sendResponseOnError } = require("../middleware/validators/util");
const passport = require('passport')

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

exports.googleSignIn = [

  passport.authenticate(['google', 'jwt'], { scope: ['profile', 'email'] }),
]

exports.fbSignin = [
  passport.authenticate(['facebook', 'jwt']),
]

exports.googleSignInCallback = [
  passport.authenticate(['google', 'facebook', 'jwt'], {
    session: false,
    failureRedirect: 'http://localhost:3000/login',
  }),
  q.googleLoginCallBack
]
