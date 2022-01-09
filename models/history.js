const connection = require('./connection');

const saveHistory = async (message, nickname, date) => {
  const db = await connection();
  await db.collection('messages').insertOne({ message, nickname, timestamp: date });
};

const getAllMessages = async () => {
  const db = await connection();
  const history = db.collection('messages').find({}).toArray();
  return history;
};

module.exports = {
  saveHistory,
  getAllMessages,
};