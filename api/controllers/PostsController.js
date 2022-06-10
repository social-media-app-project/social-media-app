const pv = require('../middleware/validators/PostsValidator');
const pq = require('../middleware/query-executors/PostsQueryExecutor');

exports.getFeed = [
  pq.executeFeedQuery,
];

exports.getPost = [
  ...pv.validatePostParams,
  pq.getPost,
];
exports.getComments = [
  ...pv.validatePostParams,
  pq.executeGetCommentsQuery,
];
exports.getLikes = [
  ...pv.validatePostParams,
  pq.executeGetLikesQuery,
];

exports.post = [
  ...pv.validatePostBody,
  pq.executeCreatePostQuery,
];
exports.likePost = [
  ...pv.validatePostParams,
  pv.validateLikePermitted,
  pq.executeLikePostQuery,
];
exports.commentPost = [
  ...pv.validatePostParams,
  ...pv.validateCommentBody,
  pv.validateCommentPermitted,
  pq.executeCommentPostQuery,
];

exports.deletePost = [
  ...pv.validatePostParams,
  pv.validateDeletePermitted,
  pq.executeDeletePostQuery,
];
