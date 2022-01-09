const conn = require('./connection');

const listMessage = async () => conn().then((db) => db.collection('messages').find().toArray());

const createMessage = async (message) => {
  const messagesList = await conn().then((db) => db.collection('messages'));
  await messagesList.insertOne(message);
};

module.exports = {
  listMessage,
  createMessage,
}; 