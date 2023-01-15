const v = require("../middleware/validators/AuthValidator");
const q = require("../middleware/query-executors/AuthQueryExecutor");
const { sendResponseOnError } = require("../middleware/validators/util");

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
