const v = require('../middleware/validators/AuthValidator');
const q = require('../middleware/query-executors/AuthQueryExecutor');

exports.jwtSignupPost = [
  ...v.validateSignupBody,
  q.saveNewUser,
];

exports.jwtLoginPost = [
  // eslint-disable-next-line consistent-return
  ...v.validateLoginBody,
  q.loginUser,
];
