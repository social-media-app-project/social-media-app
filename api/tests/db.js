/* eslint-disable dot-notation */
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');
const Post = require('../models/Post');
const { hashPassword } = require('../middleware/query-executors/AuthQueryExecutor');

let mongo;

module.exports.setUp = async () => {
  mongo = await MongoMemoryServer.create();
  const url = mongo.getUri();

  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  // eslint-disable-next-line no-console
  db.on('error', console.error.bind(console, 'mongo connection error'));
};

module.exports.setUpPostsTests = async () => {
  const userOne = new User({
    username: 'user1',
    password: await hashPassword('password'),
    email: 'testemail@gmail.com',
  });

  const savedUserOne = await userOne.save();
  const userIdOne = savedUserOne['_id'];

  const userTwo = new User({
    username: 'user2',
    password: await hashPassword('password'),
    email: 'testemail@gmail.com',
    friends: [userIdOne],
  });

  const savedUserTwo = await userTwo.save();
  const userIdTwo = savedUserTwo['_id'];

  await User.updateOne({ _id: userIdOne }, { $addToSet: { friends: userIdTwo } });

  const noFriendsUser = new User({
    username: 'user3',
    password: await hashPassword('password'),
    email: 'testemail@gmail.com',
  });

  const savedNoFriendsUser = await noFriendsUser.save();

  const userOnePost = new Post({
    author: userIdOne,
    message: 'Hi',
  });

  const savedUserOnePost = await userOnePost.save();

  return {
    userOne: savedUserOne,
    userTwo: savedUserTwo,
    noFriendsUser: savedNoFriendsUser,
    userOnePost: savedUserOnePost,
  };
};

module.exports.dropDatabase = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

module.exports.dropCollections = async () => {
  if (mongo) {
    const { collections } = mongoose.connection;

    Object.keys(collections).forEach(async (key) => {
      await collections[key].deleteMany();
    });
  }
};
