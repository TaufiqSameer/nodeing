const { MongoClient } = require("mongodb");

const MONGO_URL =
  "mongodb+srv://sameertanker_db_user:26314@airbnb.gdkfpoj.mongodb.net/?appName=airbnb";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      console.log("MongoDB connected");
      _db = client.db("airbnb");
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("DB not initialized");
  }
  return _db;
};

module.exports = {
  mongoConnect,
  getDb
};
