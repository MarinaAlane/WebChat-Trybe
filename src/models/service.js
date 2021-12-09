const connection = require('./connection');

const getAllMessages = () => connection().then((db) => db.collocation('messages').find().toArray());
const setMessage = (itens) => (
  connection()
    .then((db) => db.collection('messages')
      .insertOne({ ...itens, timestamp: new Date() }))
);

module.exports = {
  getAllMessages,
  setMessage,
};