const connection = require('./connection');

const create = async ({ message, nickname, timestamp }) => {
  const db = await connection();
  const msg = await db.collection('messages')
    .insertOne({ message, nickname, timestamp });
  return msg;
};

const getMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

module.exports = {
  create,
  getMessages,
};