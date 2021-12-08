const mongoConnection = require('./connection');

const createMessage = async (message, nickname, timestamp) => {
  const messageCollection = await mongoConnection.connection()
    .then((db) => db.collection('messages'));

  const response = await messageCollection
  .insertOne({ message, nickname, timestamp });

  return response;
};

const getMessages = async () => {
  const messageCollection = await mongoConnection.connection()
    .then((db) => db.collection('messages'));

  const response = await messageCollection
    .find().toArray();
  console.log('model response', response);
  return response;
};

module.exports = {
  createMessage,
  getMessages,
};