const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('messages').find().toArray());

const insertMessage = async (message, nickname, timestamp) => connection()
  .then((db) => db.collection('messages').insertOne({ message, nickname, timestamp }));

module.exports = {
  getAll,
  insertMessage,
}; 
