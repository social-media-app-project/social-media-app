const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

module.exports = new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3002/auth/facebook/callback',
  profileFields: [],
},
  function(accessToken, refreshToken, profile, cb){
    User.findorCreate({ facebookId: profile.id }, function(err, user){
    return cb(err, user);
  })
});
