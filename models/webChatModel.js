const connection = require('./connection');

const saveMessages = async ({ timeStamp, nickname, chatMessage }) => {
  const db = await connection();
  const savedMessages = await db.collection('messages')
    .insertOne({ timeStamp, nickname, chatMessage });
  return savedMessages;
};
const getMessagesHistory = async () => {
  const db = await connection();
  const messagesLog = await db.collection('messages').find().toArray();
  return messagesLog;
};

module.exports = {
  saveMessages,
  getMessagesHistory,
};