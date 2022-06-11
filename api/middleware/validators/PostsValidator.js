const { body, validationResult } = require('express-validator');

// TODO: We should have a single function that captures all errors and sends a response
const sendResponseOnError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //  maybe there should be a different error code
    res.status(404).send({ errors: errors.array() });
  } else {
    next();
  }
};

// Not sure what to validate here
exports.validatePostParams = [];

exports.validatePostBody = [
  body('message').trim().isLength({ min: 1, max: 500 })
    .withMessage('Message is required'),
  sendResponseOnError,
];

exports.validateCommentBody = [
  body('message').trim().isLength({ min: 1, max: 500 })
    .withMessage('Message is required'),
  sendResponseOnError,
];

exports.validateLikePermitted = (req, res, next) => {};

exports.validateCommentPermitted = (req, res, next) => {};

exports.validateDeletePermitted = (req, res, next) => {};
