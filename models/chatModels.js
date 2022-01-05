const connection = require('./connection');

const createNewMessage = async (message, nickname, timestamp) => {
   await connection()
  .then((db) => db.collection('messages')
  .insertOne({ message, nickname, timestamp }));
};

const getAllMessages = async () => {
  const messagesData = await connection()
  .then((db) => db.collection('messages')
  .find().toArray());

  return messagesData;
};

module.exports = {
  createNewMessage,
  getAllMessages,
};