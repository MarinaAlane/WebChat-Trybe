const connection = require('./connection');

const getMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

const setMessage = async (message) => {
  const db = await connection();
  const messages = db.collection('messages');
  await messages.insertOne(message);
};

module.exports = {
  getMessages,
  setMessage,
};