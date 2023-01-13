const { body, check } = require("express-validator");
const q = require("../query-executors/AuthQueryExecutor");

const checkUsernameAvailable = async (val, errMsg) => {
  const user = await q.findUser(val);
  if (user) {
    return Promise.reject(new Error(errMsg));
  }
  return true;
};

exports.validateSignupBody = [
  body("username")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Username is required")
    .isLength({ max: 25 })
    .withMessage("username is too long"),
  body("email")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is not valid"),
  body("password")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Password is required")
    .isLength({ max: 25 })
    .withMessage("password is too long"),
  body("password_confirm")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Password is required")
    .isLength({ max: 25 })
    .withMessage("password is too long"),
  body("bio").trim().escape().isLength({ max: 250 }),
  check("password_confirm", "passwords do not match")
    //  checks if passwords match
    .custom((val, { req }) => val === req.body.password),
  check("username", "username already exists").custom((val) =>
    checkUsernameAvailable(val, "username is already in use")
  ),
];

exports.validateLoginBody = [
  body("username")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Username is required")
    .isLength({ max: 25 })
    .withMessage("username is too long"),
  body("password")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Password is required")
    .isLength({ max: 25 })
    .withMessage("password is too long"),
];
