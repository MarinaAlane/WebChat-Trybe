const connectionDb = require('./connection');

const saveMessage = async (message) => {
  const db = await connectionDb();
  const result = await db.collection('messages').insertOne(message);
  return result;
};

const getAllMessages = async () => {
  const db = await connectionDb();
  const result = await db.collection('messages').find({}).toArray();
  return result;
};

module.exports = {
  saveMessage,
  getAllMessages,
};
