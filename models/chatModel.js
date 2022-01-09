const connection = require('./connection');

const create = async ({ message, nickname, timestamp }) => {
  const db = await connection();
  const msg = await db.collection('chat')
    .insertOne({ message, nickname, timestamp });
  return msg;
};

const getMessages = async () => {
  const db = await connection();
  const chat = await db.collection('chat').find().toArray();
  return chat;
};

module.exports = {
  create,
  getMessages,
};