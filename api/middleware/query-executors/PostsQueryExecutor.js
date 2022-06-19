const Post = require('../../models/Post');
const User = require('../../models/User');

// exports.executeFeedQuery = async (req, res, next) => {};

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
      res.status(200).send({ comments: post.comments });
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
      res.status(200).send({ likes: post.likes });
    }
  } catch (error) {
    next({ statusCode: 500, errors: ['Internal server error'] });
  }
};

exports.executeCreatePostQuery = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { _id } = req.user;

    const post = new Post({
      author: _id,
      message,
    });

    const savedPost = await post.save();

    if (savedPost !== post) {
      throw new Error();
    } else {
      res.status(200).send({
        msg: 'Thanks for posting',
        post: savedPost,
      });
    }
  } catch (error) {
    next({ statusCode: 500, errors: ['Internal server error: Could not create post'] });
  }
};

exports.executeLikePostQuery = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { postId } = req.params;

    const updateResult = await Post.updateOne(
      { _id: postId },
      { $addToSet: { likes: _id } },
    ).exec();

    if (updateResult.matchedCount === 1) {
      res.status(200).send({ success: [{ msg: 'Thanks for liking' }] });
    } else {
      next({ statusCode: 400, errors: ['Could not find the post to like'] });
    }
  } catch (error) {
    next({ statusCode: 500, errors: ['Internal server error: Could not like post'] });
  }
};

exports.executeCommentPostQuery = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { postId } = req.params;
    const { message } = req.body;

    const updateResult = await Post.updateOne(
      { _id: postId },
      {
        $push:
        {
          comments: {
            message,
            author: _id,
          },
        },
      },
    ).exec();

    if (updateResult.modifiedCount === 1) {
      res.status(200).send({ success: [{ msg: 'Thanks for commenting' }] });
    } else {
      next({ statusCode: 400, errors: ['Could not find the post toc omment'] });
    }
  } catch (error) {
    next({ statusCode: 500, errors: ['Internal server error: Could not comment on post'] });
  }
};

exports.executeDeletePostQuery = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { postId } = req.params;

    const deleteResult = await Post.deleteOne(
      {
        _id: postId,
        author: _id,
      },
    ).exec();

    if (deleteResult.deletedCount === 1) {
      res.status(200).send({ success: [{ msg: 'Thanks for deleting' }] });
    } else {
      next({ statusCode: 400, errors: ['Could not find the post to delete'] });
    }
  } catch (error) {
    next({ statusCode: 500, errors: ['Internal server error: Could not delete post'] });
  }
};

exports.executeUpdatePostQuery = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { postId } = req.params;
    const { message } = req.body;

    const updateResult = await Post.updateOne(
      {
        _id: postId,
        author: _id,
      },
      {
        message,
      },
    ).exec();

    if (updateResult.modifiedCount === 1) {
      res.status(200).send({ success: [{ msg: 'Thanks for updating' }] });
    } else {
      next({ statusCode: 400, errors: ['Could not find the post to update'] });
    }
  } catch (error) {
    next({ statusCode: 500, errors: ['Internal server error: Could not update post'] });
  }
};

exports.isUserFriendsWithAuthor = async (userId, postId) => {
  const post = await Post.findById(postId).select('author').exec();
  if (!post) return false;

  if (post.author === userId) return true;

  const user = await User.findOne({
    _id: userId, friends: { $all: post.author },
  }).exec();
  return user;
};

exports.isUserAuthorOfPost = async (userId, postId) => {
  const post = await Post.findById(postId).select('author').exec();
  if (!post) return false;

  return post.author === userId;
};
