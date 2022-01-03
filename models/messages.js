const connection = require('./connection');

const newMessage = (message) => connection()
  .then((db) => db.collection('messages').insertOne({ ...message }));

const getMessages = () => connection()
  .then((db) => db.collection('messages').find().toArray());

module.exports = {
  newMessage,
  getMessages,
};