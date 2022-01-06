const connection = require('./connection');

async function saveMessage(message, nickname, timestamp) {
  const newMessage = await connection()
    .then((db) => db.collection('messages').insertOne({ message, nickname, timestamp }));

  return newMessage;
}
async function getAll() {
  const allMessages = await connection()
    .then((db) => db.collection('messages').find().toArray());

  return allMessages;
}

module.exports = {
  saveMessage,
  getAll,
};