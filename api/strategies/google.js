const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/User');
require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: 'http://localhost:3002/auth/google/callback',
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, cb) => {
  try {
    const user = await User.findOrCreate({ googleId: profile.id }, {
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      email: profile.emails[0].value,
      profilePicUrl: profile.photos[0].value,
      googleId: profile.id,
    });
    if (user) {
      cb(null, user);
    } else {
      throw Error();
    }
  } catch (err) {
    console.log('There was an error siging up with google', err);
    cb(err, null);
  }
}));
passport.serializeUser((user, cb) => {
  // eslint-disable-next-line no-underscore-dangle
  cb(null, user.doc._id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findById(id).exec();
    if (user === null) {
      throw new Error('error deserializing ');
    } else {
      cb(null, user);
    }
  } catch (error) {
    console.log(error);
  }
});
