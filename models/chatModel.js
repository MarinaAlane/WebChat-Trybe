const connection = require('./connection');

const messagesList = async () => connection().then((db) => db.collection('messages')
.find().toArray());

const create = async (message) => {
  const listMessages = await connection().then((db) => db.collection('messages'));
  await listMessages.insertOne(message);
};

module.exports = {
  messagesList,
  create,
};
