const express = require('express');

const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/signup', AuthController.jwtSignupPost);
router.post('/login', AuthController.jwtLoginPost);
router.get('/google', AuthController.googleLogin);
router.get('/google/callback', AuthController.googleCallback);
router.get('/failed', (req, res) => {
  res.send({ msg: 'you have failed to login' });
});
router.get('/success', AuthController.loginSuccess);

module.exports = router;
