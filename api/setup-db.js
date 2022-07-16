const mongoose = require('mongoose');

const setupDatabase = () => {
  // Connect to DB
  const mongodb = process.env.MONGO_URI;
  mongoose.connect(mongodb, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: process.env.DB_NAME,
  });
  const db = mongoose.connection;
  // eslint-disable-next-line no-console
  db.on('error', console.error.bind(console, 'mongo connection error'));
};

module.exports = setupDatabase;
