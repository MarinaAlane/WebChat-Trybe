const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('messages').find().toArray());

const create = async (message) => {
  const messages = await connection().then((db) => db.collection('messages'));
  await messages.insertOne(message);
};

module.exports = {
  getAll,
  create,
};