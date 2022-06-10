const { body, validationResult, check } = require('express-validator');
const q = require('../query-executors/AuthQueryExecutor');

const doesUsernameExist = async (val) => {
  const user = await q.findUser(val);
  if (user !== null) {
    return Promise.reject(Error('username already in use'));
  }
  return true;
};

exports.validateSignupBody = [
  body('first_name').trim().escape().isLength({ min: 1 })
    .withMessage('First name is required')
    .matches(/^[A-Za-z]+$/)
    .withMessage(' Name must be alphabetic.')
    .isLength({ max: 25 })
    .withMessage('first name is too long'),
  body('last_name').trim().escape().isLength({ min: 1 })
    .withMessage('Last name is required')
    .matches(/^[A-Za-z]+$/)
    .withMessage('Name must be alphabetic.')
    .isLength({ max: 25 })
    .withMessage('last name is too long'),
  body('username').trim().escape().isLength({ min: 1 })
    .withMessage('Username is required')
    .isLength({ max: 25 })
    .withMessage('username is too long'),
  body('email').trim().escape().isLength({ min: 1 })
    .withMessage('email is required')
    .isEmail()
    .withMessage('email is not valid'),
  body('password').trim().escape().isLength({ min: 1 })
    .withMessage('Password is required')
    .isLength({ max: 25 })
    .withMessage('password is too long'),
  body('password_confirm').trim().escape().isLength({ min: 1 })
    .withMessage('Password is required')
    .isLength({ max: 25 })
    .withMessage('password is too long'),
  body('bio').trim().escape().isLength({ max: 250 }),
  check('password_confirm', 'passwords do not match')
    //  checks if passwords match
    .custom((val, { req }) => val === req.body.password),
  check('username', 'username already exists')
    .custom((val) => doesUsernameExist(val)),
  // TODO: We should have a single function that captures all errors and sends a response
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //  maybe there should be a different error code
      res.status(404).send({ errors: errors.array() });
    } else {
      next();
    }
  },
];
