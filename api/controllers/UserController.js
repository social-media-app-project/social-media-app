const { sendResponseOnError } = require("../middleware/validators/util");
const q = require("../middleware/query-executors/UserQuery");
const v = require("../middleware/validators/userValidator");
exports.getUser = [q.getUser];
exports.getFriends = [...v.validateUsername, sendResponseOnError, q.getUsers];
exports.postSendFriendRequest = [
  ...v.validateFriendIdParams,
  ...v.validateFriend,
  ...v.checkAlreadySentRequest,
  ...v.checkIfFriends,
  sendResponseOnError,
  q.postSendFriendRequest,
];
exports.postAcceptFriendRequest = [
  ...v.validateFriendIdParams,
  ...v.validateFriend,
  ...v.checkIfFriends,
  sendResponseOnError,
  q.postacceptFriendRequest,
];
exports.deleteFriendRequest = [
  ...v.validateFriendIdParams,
  ...v.validateFriend,
  sendResponseOnError,
  q.deleteFriendRequest,
];
exports.deleteFriend = [
  ...v.validateFriendIdParams,
  ...v.validateFriend,
  ...v.checkIfInFriendsList,
  sendResponseOnError,
  q.deleteFriend,
];

exports.updateUsername = [
  ...v.validateUsername,
  ...v.originalUsername,
  sendResponseOnError,
  q.putUpdateUsername,
];

exports.updateProfilePic = [
  ...v.validatePicUrl,
  sendResponseOnError,
  q.putUpdateProfilePic,
];
exports.updateBio = [...v.validateBio, sendResponseOnError, q.putUpdateBio];

exports.checkAvailibility = [
  ...v.validateUsername,
  ...v.originalUsername,
  sendResponseOnError,
  q.originalName,
];
