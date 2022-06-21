const pv = require('../middleware/validators/PostsValidator');
const pq = require('../middleware/query-executors/PostsQueryExecutor');
const { sendResponseOnError } = require('../middleware/validators/util');

exports.getFeed = [
  pq.executeFeedQuery,
];

exports.getPost = [
  ...pv.validatePostParams,
  sendResponseOnError,
  pq.getPost,
];
exports.getComments = [
  ...pv.validatePostParams,
  sendResponseOnError,
  pq.executeGetCommentsQuery,
];
exports.getLikes = [
  ...pv.validatePostParams,
  sendResponseOnError,
  pq.executeGetLikesQuery,
];

exports.post = [
  ...pv.validatePostBody,
  sendResponseOnError,
  pq.executeCreatePostQuery,
];
exports.likePost = [
  ...pv.validatePostParams,
  ...pv.validateLikePermitted,
  sendResponseOnError,
  pq.executeLikePostQuery,
];
exports.commentPost = [
  ...pv.validatePostParams,
  ...pv.validateCommentBody,
  ...pv.validateCommentPermitted,
  sendResponseOnError,
  pq.executeCommentPostQuery,
];

exports.deletePost = [
  ...pv.validatePostParams,
  ...pv.validateDeletePermitted,
  sendResponseOnError,
  pq.executeDeletePostQuery,
];

exports.updatePost = [
  ...pv.validatePostBody,
  ...pv.validatePostParams,
  ...pv.validateUpdatePermitted,
  sendResponseOnError,
  pq.executeUpdatePostQuery,
];
