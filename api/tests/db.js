const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

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
