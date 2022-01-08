const connection = require('./connection');

const createMessages = async (nickname, chatMessage, timestamp) => {
  const db = await connection();
  await db.collection('messages').insertOne({ nickname, message: chatMessage, timestamp });
};

const getAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

module.exports = {
  createMessages,
  getAllMessages,
};
