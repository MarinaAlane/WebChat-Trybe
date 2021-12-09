const connection = require('./connection');

const create = async (chatMessage, nickname, date) => {
  console.log('cheguei no model');
  const db = await connection();
  await db.collection('messages').insertOne({ message: chatMessage, nickname, timestamp: date });
  return true;
};

const getAll = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find({}).toArray();

  return messages;
};

module.exports = { create, getAll };