const { body } = require('express-validator');
const { sendResponseOnError } = require('./util');

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
