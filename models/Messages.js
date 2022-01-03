const connection = require('./connection');

const getAll = () =>
  connection().then((db) => db.collection('messages').find({}).toArray());

const addMessage = (message) =>
  connection().then((db) =>
    db
      .collection('messages')
      .insertOne(message));

module.exports = {
  getAll,
  addMessage,
};
