const connection = require('./connection');

const storeMessage = async (obj) => {
  const newMessage = await connection()
    .then((db) => db.collection('messages').insertOne(obj));

  return newMessage;
};

const getAllMessages = async () => {
  const getMessages = await connection()
    .then((db) => db.collection('messages').find().toArray());

  return getMessages;
};

module.exports = {
  storeMessage,
  getAllMessages,
};