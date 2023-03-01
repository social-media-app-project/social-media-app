const { body, param } = require("express-validator");
const {
  isUserFriendsWithAuthor,
  isUserAuthorOfPost,
  isUserAuthorOfComment,
  isUserAuthorOfLike,
} = require("../query-executors/PostsQueryExecutor");

// Not sure what to validate here
exports.validatePostParams = [
  param("postId")
    .trim()
    .escape()
    .isLength({ min: 24, max: 24 })
    .withMessage("Post Id is not the correct length"),
];

exports.validateCommentParams = [
  param("commentId")
    .trim()
    .escape()
    .isLength({ min: 24, max: 24 })
    .withMessage("Comment Id is not the correct length"),
];

exports.validateLikeParams = [
  param("userId")
    .trim()
    .escape()
    .isLength({ min: 24, max: 24 })
    .withMessage("user Id is not the correct length"),
];

exports.validatePostBody = [
  body("message")
    .trim()
    .escape()
    .isLength({ min: 1, max: 500 })
    .withMessage("Message is required"),
];

exports.validateCommentBody = [
  body("message")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Message is required"),
];

exports.validateLikePermitted = [
  param("postId", "user is not friends with poster").custom(
    async (postId, { req }) => {
      const { _id } = req.user;
      return isUserFriendsWithAuthor(_id, postId);
    }
  ),
];

exports.validateCommentPermitted = [
  param("postId", "user is not friends with poster").custom(
    async (postId, { req }) => {
      const { _id } = req.user;
      return isUserFriendsWithAuthor(_id, postId);
    }
  ),
];

exports.validateDeletePermitted = [
  param("postId", "user is not author of post").custom(
    async (postId, { req }) => {
      const { _id } = req.user;
      return isUserAuthorOfPost(_id, postId);
    }
  ),
];

exports.validateUpdatePermitted = [
  param("postId", "user is not author of post").custom(
    async (postId, { req }) => {
      const { _id } = req.user;
      return isUserAuthorOfPost(_id, postId);
    }
  ),
];

exports.validateCommentDeletePermitted = [
  param(["postId"], "user is not author of post or comment").custom(
    async (postId, { req }) => {
      const { _id } = req.user;
      const { commentId } = req.params;
      return Promise.any([
        isUserAuthorOfPost(_id, postId),
        isUserAuthorOfComment(_id, commentId),
      ]);
    }
  ),
];

exports.validateLikeDeletePermitted = [
  param(["postId"], "user is not author of post or like").custom(
    async (postId, { req }) => {
      const { _id } = req.user;
      const { userId } = req.params;
      return Promise.any([
        isUserAuthorOfPost(_id, postId),
        isUserAuthorOfLike(_id, userId),
      ]);
    }
  ),
];
