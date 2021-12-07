const connection = require('./connection');

const getHistoryMessages = async () => {
  const db = await connection();
  const historyMessages = await db.collection('messages').find().toArray();
  return historyMessages;
};

module.exports = {
  getHistoryMessages,
};