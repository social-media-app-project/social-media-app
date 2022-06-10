const User = require('../../models/Users');

exports.findUser = (val) => User.findOne({ username: val });

exports.saveNewUser = () => {
  try {
    bcrypt.hash(req.body.password, 10, (err, hashed) => {
      if (err) {
        throw (err);
      }
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashed,
        email: req.body.email,
        dob: req.body.dob,
        friends: [],
        bio: req.body.bio,
      });
      user.save((error) => {
        if (error) {
          throw (error);
        }
        /**
         * Can set up JWT token to be sent here on the sign up
         * and can have it on sign in
         */
      });
    });
  } catch (error) {
    return res.status(400).send({ errors: [{ msg: 'internal errorf' }] });
  }
};
