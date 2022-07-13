const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

exports.findUser = (val) => User.findOne({ email: val }).exec();

exports.saveNewUser = async (req, res, next) => {
  try {
    const hash = await exports.hashPassword(req.body.password);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: hash,
      email: req.body.email,
      friends: [],
      bio: req.body.bio,
    });

    const savedUser = await user.save();

    if (savedUser !== user) {
      throw new Error();
    }

    res.status(200).send({ success: [{ msg: 'Thanks for signing up' }] });
  } catch (error) {
    next({ statusCode: 500, errors: ['Internal server error: Could not register user'] });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();

    if (user === null) {
      next({ statusCode: 404, errors: ['Username or password is incorrect'] });
    } else {
      const result = await bcrypt.compare(req.body.password, user.password);

      if (result) {
        //  token will expire in 5 days
        const expiresDate = 1000 * 60 * 60 * 24 * 5 + Date.now();
        const opts = {};
        opts.expiresIn = expiresDate;
        const secret = process.env.SECRET;
        // eslint-disable-next-line no-underscore-dangle
        const token = jwt.sign({ userid: user._id }, secret, opts);
        res.status(200).send({ success: true, token: `Bearer ${token}`, expiresDate });
      } else {
        next({ statusCode: 404, errors: ['Username or password is incorrect'] });
      }
    }
  } catch (error) {
    next({ statusCode: 500, errors: ['Internal server error: Could not login user'] });
  }
};
