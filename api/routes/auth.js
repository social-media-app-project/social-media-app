const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/signup', AuthController.jwtSignupPost);
router.post('/login', AuthController.jwtLoginPost);
router.get('/login/google', AuthController.googleSignIn)
router.get('/login/facebook', AuthController.fbSignin);
router.get('/login/google/callback', AuthController.googleSignInCallback)

module.exports = router;
