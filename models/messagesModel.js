const connection = require('./connection');

const saveMessage = async (message, nickname, timestamp) =>
  connection()
    .then((db) =>
      db.collection('messages').insertOne({ message, nickname, timestamp }))
    .then((result) => ({ _id: result.insertedId, message, nickname }));

const getAll = async () => {
  const messages = await connection().then((db) =>
    db.collection('messages').find().toArray());
  return messages;
};

module.exports = {
  saveMessage,
  getAll,
};
