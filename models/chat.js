const connection = require('./connection');

const createMessages = async (message, nickname, date) => {
  const db = await connection();
  await db.collection('messages').insertOne({ message, nickname, timestamp: date });
};

const getMessages = async () => {
  const db = await connection();
  const messages = db.collection('messages').find({}).toArray();
  return messages;
};

module.exports = {
  createMessages,
  getMessages,
};
