const connection = require('./connection');

const getAll = () => connection().then((db) => db.collection('messages').find({}).toArray());

const saveMessage = (obj) => connection().then((db) => db.collection('messages').insertOne(obj));

module.exports = {
  getAll,
  saveMessage,
};
