const connection = require('./connection');

const getChatHistory = async () => {
  const db = await connection();
  const history = await db.collection('messages').find().toArray();

  return history;
};

const chatHistory = async (message) => {
  const db = await connection();
  await db.collection('message').insertOne(message);
};

module.exports = {
  chatHistory,
  getChatHistory,
};
