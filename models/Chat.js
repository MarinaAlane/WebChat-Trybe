const connection = require('./connection');

const getAll = () => connection().then((db) => db.collection('chat').find({}).toArray());

const saveMessage = (timestamp, name, message) => 
  connection().then((db) => db.collection('chat').insertOne({
     message, name, timestamp,
  }));

module.exports = {
  getAll,
  saveMessage,
};
