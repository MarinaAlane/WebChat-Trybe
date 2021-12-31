const connection = require('./connection');

const createMessage = async ({ nickname, chatMessage, timestamp }) => {
  const db = await connection();
  await db.collection('messages').insertOne({ nickname, chatMessage, timestamp });
  return `${timestamp} - ${nickname}: ${chatMessage}`;
};

const getAllMessage = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

module.exports = { createMessage, getAllMessage }; 