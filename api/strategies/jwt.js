const JWTStrategy = require('passport-jwt').Strategy;

const { ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
require('dotenv').config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = new JWTStrategy(opts, (jwtPayload, done) => {
  User.findById(jwtPayload.userid, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});
