const Post = require('../../models/Post');

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

exports.executeGetCommentsQuery = async (req, res, next) => {
  try {
    const post = await Post
      .findById(req.params.postId)
      .select('comments')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: {
            _id: 1,
            username: 1,
            date: 1,
          },
        },
      })
      .exec();
    if (!post) {
      next({ statusCode: 404, errors: ['Could not find post'] });
    } else {
      res.send({ comments: post.comments });
    }
  } catch (error) {
    next({ statusCode: 500, errors: ['Internal server error'] });
  }
};

exports.executeGetLikesQuery = async (req, res, next) => {
  try {
    const post = await Post
      .findById(req.params.postId)
      .select('likes')
      .populate({
        path: 'likes',
        select: {
          _id: 1,
          username: 1,
        },
      })
      .exec();
    if (!post) {
      next({ statusCode: 404, errors: ['Could not find post'] });
    } else {
      res.send({ likes: post.likes });
    }
  } catch (error) {
    next({ statusCode: 500, errors: ['Internal server error'] });
  }
};
exports.executeCreatePostQuery = async (req, res, next) => {};
exports.executeLikePostQuery = async (req, res, next) => {};
exports.executeCommentPostQuery = async (req, res, next) => {};
exports.executeDeletePostQuery = async (req, res, next) => {};
