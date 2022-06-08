const express = require('express');
const PostsController = require('../controllers/PostsController');

module.exports = (passport) => {
  const router = express.Router();

  router.get('/posts/feed', passport.authenticate('jwt', { session: false }), PostsController.getFeed);
  router.get('/posts/:postId', PostsController.getPost)
  router.get('/posts/:postId/comments', PostsController.getComments);
  router.get('/posts/:postId/likes', PostsController.getLikes);

  router.post('/posts', passport.authenticate('jwt', { session: false }), PostsController.post);
  router.post('/posts/:postId/comments', passport.authenticate('jwt', { session: false }), PostsController.commentPost);
  router.post('/posts/:postId/likes', passport.authenticate('jwt', { session: false }), PostsController.likePost);

  router.delete('/posts/:postId', passport.authenticate('jwt', { session: false }), PostsController.deletePost);

  return router;
};