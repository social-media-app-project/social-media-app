const mongoose = require("mongoose");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Comment = require("../../models/Comment");

/**
 * Create paginated home feed query
 * take query params of page to determine which page to repond with.
 * take query param to determine what that next page should be.
 * response with posts that include the users friends and the user themself
 * and the users profilepic username and _id
 */
exports.executeFeedQuery = async (req, res, next) => {
  const perPage = 20;
  let page = Math.max(0, req.query.page);
  try {
    let nextPage = null;
    const postDocs = await Post.find({
      author: { $in: [...req.user.friends, req.user._id] },
    })
      .sort({ date: 1 })
      .populate("author", "username _id profilePicUrl")
      .limit(perPage)
      .skip(perPage * page)
      .exec();
    if (!postDocs) {
      next({
        statusCode: 400,
        errors: ["Count not find posts"],
      });
    } else {
      if (postDocs.length === perPage) {
        nextPage = page + 1;
      }
      res.status(200).send({
        posts: postDocs,
        user: {
          _id: req.user._id,
          username: req.user.username,
          profilePicUrl: req.user.profilePicUrl,
        },
        nextPage: nextPage,
      });
    }
  } catch (error) {
    console.log(error);
    next({ statusCode: 500, errors: ["Internal server error"] });
  }
};
exports.executeOthersFeedQuery = async (req, res, next) => {
  try {
    const user = req.user;
    const { userId } = req.params;
    const status = {
      isFriend: false,
      requestSent: false,
      requestIncoming: false,
    };
    let [Author, Posts] = await Promise.all([
      User.findById(userId).exec(),
      Post.find({ author: userId })
        .sort({ date: 1 })
        .populate("author", "username _id profilePicUrl")
        .exec(),
    ]);
    if (!Posts || !User) {
      next({ statusCode: 404, errors: ["Could not find posts or user"] });
    } else if (user.friends.includes(userId)) {
      status.isFriend = true;
      return res.status(200).send({ Posts, User: req.user, status, Author });
    } else if (user.outgoing_requests.includes(userId)) {
      status.requestSent = true;
      return res
        .status(200)
        .send({ Posts: null, User: req.user, status, Author });
    } else if (user.incoming_requests.includes(userId)) {
      status.requestIncoming = true;
      return res
        .status(200)
        .send({ Posts: null, User: req.user, status, Author });
    } else {
      return res
        .status(200)
        .send({ Posts: null, User: req.user, status, Author });
    }
  } catch (error) {
    console.log(error);
    next({ statusCode: 500, errors: ["Internal server error"] });
  }
};

exports.getUserFeedQuery = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const Posts = await Post.find({ author: _id })
      .sort({ date: "desc" })
      .exec();
    if (!Posts) {
      next({ statusCode: 404, errors: ["Could not find posts"] });
    } else {
      res.send({ Posts, User: req.user });
    }
  } catch (error) {
    next({ statusCode: 500, errors: ["Internal server error"] });
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).exec();
    if (!post) {
      next({ statusCode: 404, errors: ["Could not find post"] });
    } else {
      res.send({ post });
    }
  } catch (error) {
    next({ statusCode: 500, errors: ["Internal server error"] });
  }
};

exports.executeGetCommentsQuery = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId)
      .select("comments")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: {
            _id: 1,
            username: 1,
            date: 1,
            profilePicUrl: 1,
          },
        },
      })
      .exec();
    if (!post) {
      next({ statusCode: 404, errors: ["Could not find post"] });
    } else {
      res.status(200).send({ comments: post.comments });
    }
  } catch (error) {
    next({ statusCode: 500, errors: ["Internal server error"] });
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $pull: { comments: commentId },
      }
    ).exec();

    const deleteResult = await Comment.deleteOne({
      _id: commentId,
    }).exec();

    if (deleteResult.deletedCount === 1) {
      res.status(200).send({ success: [{ msg: "Thanks for deleting" }] });
    } else {
      next({
        statusCode: 400,
        errors: ["Could not find the comment to delete"],
      });
    }
  } catch (error) {
    next({
      statusCode: 500,
      errors: ["Internal server error: Could not delete comment"],
    });
  }
};

exports.executeGetLikesQuery = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId)
      .select("likes")
      .populate({
        path: "likes",
        select: {
          _id: 1,
          username: 1,
        },
      })
      .exec();
    if (!post) {
      next({ statusCode: 404, errors: ["Could not find post"] });
    } else {
      res.status(200).send({ likes: post.likes });
    }
  } catch (error) {
    next({ statusCode: 500, errors: ["Internal server error"] });
  }
};

exports.deleteLike = async (req, res, next) => {
  try {
    const { postId, userId } = req.params;

    await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $pull: { likes: userId },
      }
    ).exec();

    res.status(200).send({ success: [{ msg: "Thanks for unliking" }] });
  } catch (error) {
    next({
      statusCode: 500,
      errors: ["Internal server error: Could not unlike post"],
    });
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
      return res.status(200).send({
        msg: "Thanks for posting",
        post: savedPost,
      });
    }
  } catch (error) {
    next({
      statusCode: 500,
      errors: ["Internal server error: Could not create post"],
    });
  }
};

exports.executeLikePostQuery = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { postId } = req.params;

    const updateResult = await Post.updateOne(
      { _id: postId },
      { $addToSet: { likes: _id } }
    ).exec();

    if (updateResult.matchedCount === 1) {
      res.status(200).send({ success: [{ msg: "Thanks for liking" }] });
    } else {
      next({ statusCode: 400, errors: ["Could not find the post to like"] });
    }
  } catch (error) {
    next({
      statusCode: 500,
      errors: ["Internal server error: Could not like post"],
    });
  }
};

exports.executeCommentPostQuery = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { postId } = req.params;
    const { message } = req.body;

    const comment = new Comment({
      author: _id,
      message,
    });

    const savedComment = await comment.save();
    if (savedComment !== comment) throw new Error();

    const commentId = savedComment.id;

    const updateResult = await Post.updateOne(
      { _id: postId },
      {
        $push: {
          comments: commentId,
        },
      }
    ).exec();

    if (updateResult.modifiedCount === 1) {
      res.status(200).send({ success: [{ msg: "Thanks for commenting" }] });
    } else {
      next({ statusCode: 400, errors: ["Could not find the post to comment"] });
    }
  } catch (error) {
    next({
      statusCode: 500,
      errors: ["Internal server error: Could not comment on post"],
    });
  }
};

exports.executeDeletePostQuery = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { postId } = req.params;

    const deleteResult = await Post.deleteOne({
      _id: postId,
      author: _id,
    }).exec();

    if (deleteResult.deletedCount === 1) {
      res.status(200).send({ success: [{ msg: "Thanks for deleting" }] });
    } else {
      next({ statusCode: 400, errors: ["Could not find the post to delete"] });
    }
  } catch (error) {
    next({
      statusCode: 500,
      errors: ["Internal server error: Could not delete post"],
    });
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
      }
    ).exec();

    if (updateResult.modifiedCount === 1) {
      res.status(200).send({ success: [{ msg: "Thanks for updating" }] });
    } else {
      next({ statusCode: 400, errors: ["Could not find the post to update"] });
    }
  } catch (error) {
    next({
      statusCode: 500,
      errors: ["Internal server error: Could not update post"],
    });
  }
};

exports.isUserFriendsWithAuthor = async (userId, postId) => {
  const post = await Post.findById(postId).select("author").exec();
  if (!post) return Promise.reject(new Error("Post not found"));
  if (new mongoose.Types.ObjectId(userId).equals(post.author))
    return Promise.resolve("User is author of post");

  const user = await User.findOne({
    _id: userId,
    friends: { $all: post.author },
  }).exec();
  return user
    ? Promise.resolve("User is friends with author")
    : Promise.reject(new Error("User is not friends with author"));
};

exports.isUserAuthorOfPost = async (userId, postId) => {
  const post = await Post.findById(postId).select("author").exec();
  if (!post) return Promise.reject(new Error("Post not found"));

  return new mongoose.Types.ObjectId(userId).equals(post.author)
    ? Promise.resolve("User is author of post")
    : Promise.reject(new Error("User is not author of post"));
};

exports.isUserAuthorOfComment = async (userId, commentId) => {
  const comment = await Comment.findById(commentId).select("author").exec();
  if (!comment) return Promise.reject(new Error("Comment not found"));

  return new mongoose.Types.ObjectId(userId).equals(comment.author)
    ? Promise.resolve("User is author of comment")
    : Promise.reject(new Error("User is not author of comment"));
};

exports.isUserAuthorOfLike = (userId, likeId) => {
  const isAuthor = new mongoose.Types.ObjectId(likeId).equals(userId);
  return isAuthor
    ? Promise.resolve("User is author of like")
    : Promise.reject(new Error("User is not author of like"));
};
