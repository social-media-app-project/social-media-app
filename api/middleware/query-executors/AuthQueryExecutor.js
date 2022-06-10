const User = require('../../models/Users');

exports.findUser = (val) => User.findOne({ username: val });
