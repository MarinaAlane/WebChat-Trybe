const connection = require('./connection');

const create = async (nickname, message, timestamp) => {
  await connection()
    .then((db) => db.collection('messages').insertOne({ nickname, message, timestamp }));
};

const getAll = async () => {
  const messages = await connection()
    .then((db) => db.collection('messages').find().toArray());
  return messages;
};

module.exports = {
  create,
  getAll,
};