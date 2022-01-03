const connection = require('./connection');

const getAllMsg = () => 
  connection().then((db) =>
    db.collection('messages').find({}).toArray());

const saveMessages = (message) => 
  connection().then((db) =>
    db.collection('messages').insertOne(message));

module.exports = {
  getAllMsg,
  saveMessages,
};
