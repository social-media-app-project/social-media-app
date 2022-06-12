const Post = require('../../models/Posts');

exports.executeFeedQuery = async (req, res, next) => {};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).exec();
    if (!post) {
      next({ statusCode: 404, errors: ['Could not find post'] });
    } else {
      res.send({ post });
    }
  } catch (error) {
    next({ statusCode: 500, errors: ['Internal server error'] });
  }
};

exports.executeGetCommentsQuery = async (req, res, next) => {};
exports.executeGetLikesQuery = async (req, res, next) => {};
exports.executeCreatePostQuery = async (req, res, next) => {};
exports.executeLikePostQuery = async (req, res, next) => {};
exports.executeCommentPostQuery = async (req, res, next) => {};
exports.executeDeletePostQuery = async (req, res, next) => {};
