const pv = require("../middleware/validators/PostsValidator");
const pq = require("../middleware/query-executors/PostsQueryExecutor");
const { sendResponseOnError } = require("../middleware/validators/util");

exports.getFeed = [pq.executeFeedQuery];
exports.getPosts = [pq.getUserFeedQuery];

exports.getOtherPosts = [
  ...pv.validateLikeParams,
  sendResponseOnError,
  pq.executeOthersFeedQuery,
];
exports.getPost = [...pv.validatePostParams, sendResponseOnError, pq.getPost];
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

exports.deleteComment = [
  ...pv.validatePostParams,
  ...pv.validateCommentParams,
  ...pv.validateCommentDeletePermitted,
  sendResponseOnError,
  pq.deleteComment,
];

exports.deleteLike = [
  ...pv.validatePostParams,
  ...pv.validateLikeParams,
  ...pv.validateLikeDeletePermitted,
  sendResponseOnError,
  pq.deleteLike,
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
