const connection = require('./connection');

const create = async (message, nickname, timestamp) => {
  const db = await connection();
  const createdMessage = await db.collection('messages')
    .insertOne({ message, nickname, timestamp });
  return createdMessage;
};

const getAll = async () => {
  const db = await connection();

  const messages = await db.collection('messages').find().toArray();

  return messages;
};

module.exports = {
  create,
  getAll,
};
