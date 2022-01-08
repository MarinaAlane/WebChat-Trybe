//const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createMessage = async (message, nickname, timestamp) => {
  const db = await connection();

  const newMessage = await db.collection('messages')
    .insertOne({ message, nickname, timestamp });
  return newMessage;
};

const getAllMessages = async () => {
  const db = await connection();
  return db.collection('messages').find().toArray();
};


module.exports = {
  createMessage,
  getAllMessages,
};