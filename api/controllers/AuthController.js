const bcrypt = require('bcryptjs');
const { body, validationResult, check } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/Users');
const v = require('../middleware/validators/AuthValidator');

exports.jwtSignupPost = [
  ...v.validateSignupBody,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //  maybe there should be a different error code
      return res.status(404).send({ errors: errors.array() });
    }
    try {
      bcrypt.hash(req.body.password, 10, (err, hashed) => {
        if (err) {
          throw (err);
        }
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          password: hashed,
          email: req.body.email,
          dob: req.body.dob,
          friends: [],
          bio: req.body.bio,
        });
        user.save((error) => {
          if (error) {
            throw (error);
          }
          /**
           * Can set up JWT token to be sent here on the sign up
           * and can have it on sign in
           */
        });
      });
    } catch (error) {
      return res.status(400).send({ errors: [{ msg: 'internal errorf' }] });
    }
    return res.status(200).send({ success: [{ msg: 'Thanks for signing up' }] });
  },
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
