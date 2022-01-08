const connection = require('./connection');
const { getActualDateFormated } = require('../helpers/createMessage');

const getAllMessages = async () => connection()
  .then((db) => db.collection('messages').find().toArray());

const saveMessage = async ({ message, nickname, id }) => {
  const timestamp = getActualDateFormated();
  return connection()
    .then((db) => db.collection('messages').insertOne({ message, nickname, id, timestamp }));
};

module.exports = {
  getAllMessages,
  saveMessage,
};
