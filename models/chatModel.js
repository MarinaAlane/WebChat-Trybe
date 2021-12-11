const mongoConnection = require('./connection');

const storeMsg = async (nickname, message, timestamp) => {
  const webchatCollection = await mongoConnection()
    .then((db) => db.collection('messages'));

    await webchatCollection
    .insertOne({ nickname, message, timestamp });
};

const getChatHistory = async () => {
  const webchatCollection = await mongoConnection()
    .then((db) => db.collection('messages'));

    const history = await webchatCollection
    .find()
    .toArray();

    return history;
};

module.exports = {
  storeMsg,
  getChatHistory,
};