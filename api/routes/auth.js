var express = require('express');
var router = express.Router();
const AuthController = require('../controller/AuthController')

router.post('/signup',AuthController.jwt_signup_post)

module.exports = router;