const connection = require('../connection/connection');

const addNewMessage = async ({ message, nickname, timestamp }) => {
  const newMessage = await (
    connection().then((db) => db.collection('messages').insertOne({ message, nickname, timestamp }))
  );

  return newMessage;
};

const getAllMessages = async () => {
  const messages = await connection().then((db) => db.collection('messages').find().toArray());

  return messages;
};

module.exports = {
  addNewMessage,
  getAllMessages,
};
