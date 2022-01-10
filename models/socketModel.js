const connection = require('./connection');

const storeMessage = async (message, nickname, timestamp) => {
  const newMessage = await connection()
    .then((db) => db.collection('messages').insertOne({ message, nickname, timestamp }));

  return newMessage;
};

const getAllMessages = async () => {
  const getMessages = await connection()
    .then((db) => db.collection('messages').find().toArray());

  return getMessages;
};

module.exports = {
  storeMessage,
  getAllMessages,
};