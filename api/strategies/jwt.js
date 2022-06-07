const User = require('../models/Users');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = new JWTStrategy(opts,(jwt_payload, done)=>{
  User.findById(jwt_payload.userid, function(err,user){
    if(err){
      return done(err,false);
    }
    if(user){
      return done(null,user)
    }else{
      return done(null,false);
    }
  })
})