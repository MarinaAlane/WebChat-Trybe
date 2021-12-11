const connection = require('./connection');

const getMessagesHistory = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find({}).toArray();

  return messages;
};

const postMessage = async (chatMessage, nickname, date) => {
  const db = await connection();
  await db.collection('messages').insertOne({ message: chatMessage, nickname, timestamp: date });
  return true;
};

module.exports = { getMessagesHistory, postMessage };
