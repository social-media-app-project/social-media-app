const express = require("express");
const PostsController = require("../controllers/PostsController");

const router = express.Router();

// TODO: router.get('/feed', PostsController.getFeed);
router.get("/homefeed", PostsController.getFeed);
router.get("/user", PostsController.getPosts);
router.get("/:userId", PostsController.getOtherPosts);
router.get("/:postId", PostsController.getPost);
router.get("/:postId/comments", PostsController.getComments);
router.get("/:postId/likes", PostsController.getLikes);

router.post("/", PostsController.post);
router.post("/:postId/comments", PostsController.commentPost);
router.post("/:postId/likes", PostsController.likePost);

router.delete("/:postId/comments/:commentId", PostsController.deleteComment);
router.delete("/:postId/likes/:userId", PostsController.deleteLike);

router.delete("/:postId", PostsController.deletePost);
router.put("/:postId", PostsController.updatePost);

module.exports = router;
