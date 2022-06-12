const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');

exports.findUser = (val) => User.findOne({ username: val }).exec();

exports.saveNewUser = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      password: hash,
      email: req.body.email,
      friends: [],
      bio: req.body.bio,
    });

    const savedUser = await user.save();

    if (savedUser !== user) {
      throw new Error('couldnt save');
    }

    res.status(200).send({ success: [{ msg: 'Thanks for signing up' }] });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: 'internal errorf' }] });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();

    if (user === null) {
      res.status(404).send();
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
        res.status(404).send();
      }
    }
  } catch (error) {
    res.status(404).json({ errors: [error] });
  }
};
