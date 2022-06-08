const express = require('express');

const router = express.Router();
const AuthController = require('../controller/AuthController');

router.post('/signup', AuthController.jwtSignupPost);
router.post('/login', AuthController.jwtLoginPost);

module.exports = router;
