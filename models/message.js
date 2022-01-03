const connection = require('./connection');

const createMessage = async ({ timeStamp, nickname, chatMessage }) => {
  const db = await connection();
  await db.collection('messages').insertOne({ timeStamp, nickname, chatMessage });
  return `${timeStamp} - ${nickname}: ${chatMessage}`;
};

const getAllMessage = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

module.exports = { createMessage, getAllMessage }; 