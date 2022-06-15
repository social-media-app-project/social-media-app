const { body, param } = require('express-validator');
const { isUserFriendsWithAuthor, isUserAuthorOfPost } = require('../query-executors/PostsQueryExecutor');

// Not sure what to validate here
exports.validatePostParams = [
  param('postId').trim().isLength({ min: 24, max: 24 })
    .withMessage('Post Id is not the correct length'),
];

exports.validatePostBody = [
  body('message').trim().isLength({ min: 1, max: 500 })
    .withMessage('Message is required'),
];

exports.validateCommentBody = [
  body('message').trim().isLength({ min: 1, max: 500 })
    .withMessage('Message is required'),
];

exports.validateLikePermitted = [
  param('postId', 'user is not friends with poster')
    .custom(async (postId, { req }) => {
      const { _id } = req.user;
      const result = await isUserFriendsWithAuthor(_id, postId);
      return result;
    }),
];

exports.validateCommentPermitted = [
  param('postId', 'user is not friends with poster')
    .custom(async (postId, { req }) => {
      const { _id } = req.user;
      const result = await isUserFriendsWithAuthor(_id, postId);
      return result;
    }),
];

exports.validateDeletePermitted = [
  param('postId', 'user is not author of post')
    .custom(async (postId, { req }) => {
      const { _id } = req.user;
      const result = await isUserAuthorOfPost(_id, postId);
      return result;
    }),
];

exports.validateUpdatePermitted = [
  param('postId', 'user is not author of post')
    .custom(async (postId, { req }) => {
      const { _id } = req.user;
      const result = await isUserAuthorOfPost(_id, postId);
      return result;
    }),
];
