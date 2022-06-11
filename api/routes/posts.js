const express = require('express');
const PostsController = require('../controllers/PostsController');

const router = express.Router();

// TODO: router.get('/feed', PostsController.getFeed);
router.get('/:postId', PostsController.getPost);
/* TODO: router.get('/:postId/comments', PostsController.getComments);
router.get('/:postId/likes', PostsController.getLikes);

router.post('/', PostsController.post);
router.post('/:postId/comments', PostsController.commentPost);
router.post('/:postId/likes', PostsController.likePost);

router.delete('/:postId', PostsController.deletePost); */

module.exports = router;
