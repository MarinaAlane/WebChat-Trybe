const connection = require('./connection');

const addMessage = async (message) => {
  // ver isso dps
  const db = await connection();
  await db.collection('messages').insertOne(message);
};

const getMessages = async () => {
  const db = await connection();
  return db.collection('messages').find().toArray();
};

module.exports = {
  addMessage,
  getMessages,
};  