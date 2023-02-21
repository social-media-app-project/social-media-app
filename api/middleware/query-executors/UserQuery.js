const mongoose = require("mongoose");
const User = require("../../models/User");

exports.getUser = async (req, res, next) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    console.log(error);
    next({ statusCode: 500, errors: ["Internal Server Error"] });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { username } = req.params;
    const regex = new RegExp(username, "i");
    const potentialFriends = await User.find({
      username: { $regex: regex },
    })
      .select("_id outgoing_requests incoming_requests username profilePicUrl")
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

exports.postSendFriendRequest = async (req, res, next) => {
  try {
    const friend = req.friend;
    const user = req.user;
    friend.incoming_requests.push(user._id);
    user.outgoing_requests.push(friend._id);
    await friend.save();
    await user.save();
    res.status(200).send({ success: { msg: "Friend Request Sent" } });
  } catch (error) {
    next({
      statusCode: 500,
      errors: ["Internal server error"],
    });
  }
};
exports.postacceptFriendRequest = async (req, res, next) => {
  try {
    const friend = req.friend;
    const user = req.user;
    user.incoming_requests.remove(friend._id);
    friend.outgoing_requests.remove(user._id);
    user.friends.push(friend._id);
    friend.friends.push(user._id);
    await friend.save();
    await user.save();
    res.status(200).send({ success: { msg: "You are now friends" } });
  } catch (error) {
    next({
      statusCode: 500,
      errors: ["Internal server error"],
    });
  }
};

exports.deleteFriendRequest = async (req, res, next) => {
  try {
    const friend = req.friend;
    const user = req.user;
    user.incoming_requests.remove(friend._id);
    friend.outgoing_requests.remove(user._id);
    await user.save();
    await friend.save();
    res
      .status(200)
      .send({ sucess: [{ msg: "You deleted the friend request" }] });
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
    res.status(200).send({
      sucess: [{ msg: `You are no longer friends with ${friend.username}` }],
    });
  } catch (error) {
    next({
      statusCode: 500,
      errors: ["Internal server error"],
    });
  }
};

exports.putUpdateUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
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

exports.originalName = async (req, res, next) => {
  try {
    res.status(200).send({ success: { msg: "username available" } });
  } catch (error) {
    next({ statusCode: 500, error: ["Internal Server Error"] });
  }
};

exports.putUpdateProfilePic = async (req, res, next) => {
  try {
    req.user.profilePicUrl = req.body.picUrl;
    await req.user.save();
    res.status(200).send({ success: [{ msg: "Profile Pic updated" }] });
  } catch (error) {
    next({ statusCode: 500, error: ["Internal Server Error"] });
  }
};
