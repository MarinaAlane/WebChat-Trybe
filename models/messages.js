const connection = require('./connection');

// Salva uma mensagem
const saveMessage = async (message, nickname, timestamp) => connection()
    .then((db) => db.collection('messages').insertOne({ message, nickname, timestamp }))
    .then((result) => ({ _id: result.insertedId, message, nickname }));

// Recupera todas ass mensagems
const getAllMessages = async () => {
  const messages = await connection()
    .then((db) => db.collection('messages').find().toArray());
  return messages;
};

module.exports = {
  saveMessage,
  getAllMessages,
};