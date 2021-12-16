const connection = require('./connection');

const setMessage = async (message) => {
    const db = await connection();
    const createdUser = await db.collection('messages').insertOne(message);
    return createdUser;
};

const getMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

module.exports = {
  setMessage,
  getMessages,
};