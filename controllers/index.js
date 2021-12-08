const connection = require('../models/connection');

const createMessage = async (message, nickname, time) => {
  const collection = await connection()
    .then((db) => db.collection('messages'));
  return collection.insertOne({ message, nickname, time });
};

const getMessages = async () => {
  const collection = await connection()
    .then((db) => db.collection('messages'));
  const response = collection.find().toArray();

  return response;
};

module.exports = { createMessage, getMessages };
