const pv = require('../middleware/validators/PostsValidator');
const pq = require('../middleware/query-executors/PostsQueryExecutor');
const pr = require('../middleware/responders/PostsResponder');

exports.getFeed = [
  pq.executeFeedQuery,
  pr.sendFeedResponse,
];

exports.getPost = [
  ...pv.validatePostParams,
  pq.executeGetPostQuery,
  pr.sendGetPostResponse,
];
exports.getComments = [
  ...pv.validatePostParams,
  pq.executeGetCommentsQuery,
  pr.sendGetCommentsResponse,
];
exports.getLikes = [
  ...pv.validatePostParams,
  pq.executeGetLikesQuery,
  pr.sendGetLikesResponse,
];

exports.post = [
  ...pv.validatePostBody,
  pq.executeCreatePostQuery,
  pr.sendCreatePostResponse,
];
exports.likePost = [
  ...pv.validatePostParams,
  pv.validateLikePermitted,
  pq.executeLikePostQuery,
  pr.sendLikePostResponse,
];
exports.commentPost = [
  ...pv.validatePostParams,
  ...pv.validateCommentBody,
  pv.validateCommentPermitted,
  pq.executeCommentPostQuery,
  pr.sendCommentPostResponse,
];

exports.deletePost = [
  ...pv.validatePostParams,
  pv.validateDeletePermitted,
  pq.executeDeletePostQuery,
  pr.sendDeletePostResponse,
];
