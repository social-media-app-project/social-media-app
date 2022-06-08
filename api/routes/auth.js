var express = require('express');
var router = express.Router();
const AuthController = require('../controller/AuthController')

router.post('/signup',AuthController.jwtSignupPost)
router.post('/login',AuthController.jwtLoginPost)

module.exports = router;