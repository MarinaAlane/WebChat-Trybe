const connection = require('./connection');

const createMessage = async (message) => {
  const db = await connection();
  await db.collection('messages').insertOne(message);
  return result;
};

const getAllMessage = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

module.exports = { createMessage, getAllMessage }; 