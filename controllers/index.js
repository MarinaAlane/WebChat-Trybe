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

// const getByNickName = async (nickname) => {
//   const user = await connection()
//     .then((db) => db.collection('messages').findAll({ nickname }));
//   return user;
// };

module.exports = { createMessage, getMessages };
