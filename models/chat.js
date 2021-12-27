const connection = require('./connection');

const saveMessage = async (msg) => {
  const db = await connection();

  await db.collection('messages').insertOne(msg);
};

const getMessages = async () => {
  const db = await connection();

  const messages = await db.collection('messages').find().toArray();

  return messages;
};

module.exports = {
  saveMessage,
  getMessages,
};
