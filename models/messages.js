const getConnection = require('./connection');

const getAllMessages = async () => {
  const db = await getConnection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

const postMessage = async ({ timestamp, nickname, chatMessage }) => {
  const db = await getConnection();
  const dataMessage = await db.collection('messages').insertOne({
    timestamp,
    nickname,
    chatMessage,
  });
  return dataMessage;
};

module.exports = {
  getAllMessages,
  postMessage,
};