const connection = require('./connection');

const getAll = () => connection().then((db) => db.collection('messages').find({}).toArray());

const saveMessage = (item) => 
  connection().then((db) => db.collection('messages').insertOne(item));

module.exports = {
  getAll,
  saveMessage,
};
