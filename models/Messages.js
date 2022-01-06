const connection = require('./connection');

const create = async (nickname, chatMessage, timestamp) => {
  await connection()
    .collection('messages').insertOne({ nickname, message: chatMessage, timestamp });
};

const getAll = async () => {
  const messages = await connection()
    .collection('messages').find().toArray();
  return messages;
};

module.exports = {
  create,
  getAll,
};