const { connection } = require('./connection');

const getAll = async () => connection().then((db) => db.collection('messages').find().toArray());

const create = async (message) => {
  const messages = async () => connection().then((db) => db.collection('messages'));
  const messageSent = await messages.insertOne(message);
  console.log(messageSent);
};

module.exports = {
  getAll,
  create,
};