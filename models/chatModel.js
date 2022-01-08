const connection = require('./connection');

const insertChatMessage = async (dataMessage) => {
  const db = await connection();
  await db.collection('messages').insertOne(dataMessage);
};

const getChatHistory = async () => {
  const db = await connection();
  const chatHistory = await db.collection('messages').find({}).toArray();
  return chatHistory;
};

module.exports = {
  insertChatMessage,
  getChatHistory,
}; 