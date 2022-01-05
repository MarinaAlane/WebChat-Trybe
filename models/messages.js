const { ObjectID } = require('mongodb');
const connection = require('./connection');

const insertMessage = async ({ nickname, message, timestamp }) => {
  const db = await connection();
  const result = await db.collection('messages').insertOne({ nickname, message, timestamp });
  console.log(result);
  return result;
};

const getMessageById = async (id) => {
  const db = await connection();
  const message = await db.collection('messages').findOne({ _id: ObjectID(id) });
  return message;
};

const getAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray({});
  return messages;
};

module.exports = {
  insertMessage,
  getMessageById,
  getAllMessages,
};
