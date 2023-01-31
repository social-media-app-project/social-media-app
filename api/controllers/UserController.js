const { sendResponseOnError } = require("../middleware/validators/util");
const q = require("../middleware/query-executors/UserQuery");
const v = require("../middleware/validators/userValidator");
exports.getFriends = [...v.validateUsername, sendResponseOnError, q.getUsers];
exports.postAddFriend = [
  ...v.validateFriendIdParams,
  ...v.validateFriend,
  ...v.checkAlreadySentRequest,
  ...v.checkIfFriends,
  sendResponseOnError,
  q.postAddFriend,
];
exports.updateUsername = [
  ...v.validateUsername,
  ...v.originalUsername,
  sendResponseOnError,
  q.putUpdateUsername,
];
exports.updateBio = [...v.validateBio, sendResponseOnError, q.putUpdateBio];
exports.deleteFriend = [
  ...v.validateFriendIdParams,
  ...v.checkIfInFriendsList,
  sendResponseOnError,
  q.deleteFriend,
];
