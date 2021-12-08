const connection = require('./connection');

const getMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

const createMessage = async (chatMessage, nickname, messageTime) => {
  const db = await connection();
  db.collection('messages').insertOne({ message: chatMessage, nickname, timestamp: messageTime });
};

module.exports = {
  getMessages,
  createMessage,
};