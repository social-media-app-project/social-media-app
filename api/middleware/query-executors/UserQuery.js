const mongoose = require("mongoose");
const User = require("../../models/User");

exports.getUsers = async (req, res, next) => {
  try {
    console.log(req.user);
    const { username } = req.params;
    const regex = new RegExp(username, "i");
    const potentialFriends = await User.find({
      username: { $regex: regex },
    })
      .select("_id outgoing_requests incoming_requests username")
      .limit(10);
    if (!potentialFriends) {
      next({ statusCode: 404, errors: ["No Users Found"] });
    } else {
      res.status(200).send(potentialFriends);
    }
  } catch (error) {
    next({
      statusCode: 500,
      errors: ["Internal server error"],
    });
  }
};

exports.postAddFriend = async (req, res, next) => {
  try {
    const friend = req.friend;
    const user = req.user;
    if (friend.outgoing_request.includes(user._id)) {
      friend.outgoing_request.remove(user._id);
      friend.friends.push(user._id);
      user.friends.push(friend._id);
      res.status(200).send({ success: [{ msg: "You are Now Friends" }] });
    } else {
      friend.incoming_request.push(user_id);
      user.outgoing_request.push(user_id);
      res.status(200).send({ success: [{ msg: "Friend Request Sent" }] });
    }
    await user.save();
    await friend.save();
  } catch (error) {
    next({
      statusCode: 500,
      errors: ["Internal server error"],
    });
  }
};

exports.putUpdateUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    req.user.username = username;
    await req.user.save();
    res.status(200).send({ success: [{ msg: "Username updated" }] });
  } catch (error) {
    next({
      statusCode: 500,
      errors: ["Internal server error"],
    });
  }
};

exports.putUpdateBio = async (req, res, next) => {
  try {
    const { bio } = req.body;
    req.user.bio = bio;
    await req.user.save();
    res.status(200).send({ success: [{ msg: "Bio updated" }] });
  } catch (error) {
    next({
      statusCode: 500,
      errors: ["Internal server error"],
    });
  }
};

exports.deleteFriend = async (req, res, next) => {
  try {
    const friend = req.friend;
    friend.friends.remove(req.user._id);
    req.user.friends.remove(friend._id);
    await friend.save();
    await req.user.save();
    res
      .statusCode(200)
      .send({ sucess: [{ msg: "You are not longer friends" }] });
  } catch (error) {
    next({
      statusCode: 500,
      errors: ["Internal server error"],
    });
  }
};
