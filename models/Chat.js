const connection = require('./connection');

const saveMessage = async (message, nickname, timestamp) => {
  await connection()
    .then((db) => db.collection('messages').insertOne({ message, nickname, timestamp }));

  return true;
};

const getMessages = async () => {
  const messages = await connection()
    .then((db) => db.collection('messages').find().toArray());

  return messages;
};

module.exports = {
  saveMessage,
  getMessages,
};
