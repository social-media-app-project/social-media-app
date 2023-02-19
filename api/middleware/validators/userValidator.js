const { body, param } = require("express-validator");
const User = require("../../models/User");

exports.validateFriendIdParams = [
  param("friendId")
    .trim()
    .isLength({ min: 24, max: 24 })
    .withMessage("User Id is not the correct length")
    .bail()
    .custom((value, { req }) => {
      if (value == req.user._id) {
        return Promise.reject("You cannot be friends with yourself");
      } else {
        return true;
      }
    }),
];
exports.validateFriend = [
  param("friendId")
    .custom(async (value, { req }) => {
      try {
        const friendDoc = await User.findById(value);
        if (!friendDoc) {
          return Promise.reject("This user does not exist");
        } else {
          req.friend = friendDoc;
          return true;
        }
      } catch (error) {}
    })
    .bail(),
];
exports.checkIfFriends = [
  param("friendId")
    .custom(async (value, { req }) => {
      try {
        if (
          req.friend.friends.includes(req.user._id) &&
          req.user.friends.includes(value)
        ) {
          return Promise.reject("You are already Friends");
        } else {
          return Promise.resolve();
        }
      } catch (error) {}
    })
    .bail(),
];
exports.checkAlreadySentRequest = [
  param("friendId")
    .custom(async (value, { req }) => {
      try {
        const incoming_requests = req.friend.incoming_requests;
        if (incoming_requests.includes(req.user._id)) {
          return Promise.reject("You already sent a friend request");
        } else {
          return Promise.resolve();
        }
      } catch (error) {}
    })
    .bail(),
];

exports.validateUsername = [
  param("username")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Username is required")
    .isLength({ max: 25 })
    .withMessage("username is too long"),
];
exports.originalUsername = [
  param("username").custom(async (value) => {
    try {
      const name = await User.findOne({ username: value });
      if (name) {
        return Promise.reject("Username not available");
      } else {
        return Promise.resolve();
      }
    } catch (error) {}
  }),
];

exports.validateBio = [
  body("bio")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Bio is too short")
    .isLength({ max: 500 })
    .withMessage("Bio is too long"),
];

exports.checkIfInFriendsList = [
  param("friendId").custom(async () => {
    try {
      if (
        req.user.friends.includes(req.friend._id) &&
        req.friend.friends.includes(req.user._id)
      ) {
        return true;
      } else {
        return Promise.reject("You are not friends");
      }
    } catch (error) {}
  }),
];

exports.validatePicUrl = [
  body("picUrl").isURL().trim().withMessage("not valid url"),
];
