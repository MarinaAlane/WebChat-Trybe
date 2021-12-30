const connection = require('./connection');
require('dotenv').config();

const insert = (chat) =>
  connection().then((db) =>
    db
      .collection('messages')
      .insertOne({ ...chat })
      .then((result) => ({
        _id: result.insertedId,
        ...chat,
      })));

const getAll = () =>
  connection().then((db) => db.collection('messages').find().toArray());
  
module.exports = {
  insert,
  getAll,
};