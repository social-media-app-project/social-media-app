const { validationResult } = require('express-validator');

exports.sendResponseOnError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next({ statusCode: 400, errors });
  } else {
    next();
  }
};
