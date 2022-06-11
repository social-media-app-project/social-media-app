const Post = require('../../models/Posts');

exports.executeFeedQuery = async (req, res, next) => {};

exports.getPost = async (req, res) => {
  try {
    console.log(req.params.postId);
    const post = await Post.findById(req.params.postId).exec();
    if (!post) {
      throw new Error('couldnt find post');
    }
    res.json({ post });
  } catch (error) {
    res.status(400).send({ errors: [{ error }] });
  }
};

exports.executeGetCommentsQuery = async (req, res, next) => {};
exports.executeGetLikesQuery = async (req, res, next) => {};
exports.executeCreatePostQuery = async (req, res, next) => {};
exports.executeLikePostQuery = async (req, res, next) => {};
exports.executeCommentPostQuery = async (req, res, next) => {};
exports.executeDeletePostQuery = async (req, res, next) => {};
