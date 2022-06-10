const bcrypt = require('bcryptjs');
const { body, validationResult, check } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/Users');
const v = require('../middleware/validators/AuthValidator');
const q = require('../middleware/query-executors/AuthQueryExecutor');

exports.jwtSignupPost = [
  ...v.validateSignupBody,
  q.saveNewUser(),
  (req, res) => res.status(200).send({ success: [{ msg: 'Thanks for signing up' }] }),

];

exports.jwtLoginPost = [
  body('username').trim().escape().isLength({ min: 1 })
    .withMessage('Username is required')
    .isLength({ max: 25 })
    .withMessage('username is too long'),
  body('password').trim().escape().isLength({ min: 1 })
    .withMessage('Password is required')
    .isLength({ max: 25 })
    .withMessage('password is too long'),
  // eslint-disable-next-line consistent-return
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).send({ errors: errors.array() });
    }
    try {
      User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
          throw (err);
        }
        if (user === null) {
          throw new Error('user not found');
        }
        bcrypt.compare(req.body.password, user.password, (cryptError, pass) => {
          if (cryptError) {
            throw new Error(cryptError);
          }
          //  token will expire in 5 days
          const expiresDate = 1000 * 60 * 60 * 24 * 5 + Date.now();
          const opts = {};
          opts.expiresIn = expiresDate;
          const secret = process.env.SECRET;
          // eslint-disable-next-line no-underscore-dangle
          const token = jwt.sign({ userid: user._id }, secret, opts);
          if (pass) {
            return res.status(200).send({ success: true, token: `Bearer ${token}`, expiresDate });
          }
          throw new Error('password is incorrect');
        });
      });
    } catch (error) {
      return res.status(404).json({ errors: [{ errors: error }] });
    }
  },
];
