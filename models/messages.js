const connection = require('./connection');

const getAllMessages = async () => {
  const messages = await connection()
    .then((db) => db.collection('messages').find({}).toArray());

  return messages;
};

const insertMessage = async (message) => {
  await connection()
    .then((db) => db.collection('messages').insertOne({ message }));
};

module.exports = {
  getAllMessages,
  insertMessage,
};
