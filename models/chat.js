const connection = require('./connection');

const chatHistory = async (message) => {
  const db = await connection();
  await db.collection('message').insertOne(message);
};

module.exports = chatHistory;
