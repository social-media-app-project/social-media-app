const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

exports.sendResponseOnError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next({ statusCode: 400, errors });
  } else {
    next();
  }
};

exports.validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.userid);
    if (!user) {
      res.statusCode(401).send({ errors: "Not Authorized" });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {}
};
