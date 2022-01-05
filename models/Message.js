const connection = require('./connection');

const create = async (messageData) => {
  connection()
    .then((db) => db.collection('messages').insertOne(messageData));
};

const getAll = async () => 
  connection()
    .then((db) => db.collection('messages').find({}).toArray());

module.exports = { create, getAll };