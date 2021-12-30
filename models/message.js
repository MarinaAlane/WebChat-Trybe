const { ObjectId } = require('mongodb');
const connection = require('./connection');
const { messages } = require('./collections');

const getMessages = async () => {
  const db = await connection();
  const query = await db.collection(messages).find().toArray();
  return query;
};

const getMessagesByNickname = async (nickname) => {
  const db = await connection();
  const query = await db.collection(messages).find({ nickname }).toArray();
  return query;
};

const getMessageById = async (id) => {
  const db = await connection();
  const query = await db.collection(messages).findOne(new ObjectId(id));
  return query;
};

const addMessage = async (message) => {
  const db = await connection();
  const insert = await db.collection(messages).insertOne({ ...message });
  return {
    _id: insert.insertedId,
    ...message,
  };
};

module.exports = {
  getMessages,
  getMessagesByNickname,
  getMessageById,
  addMessage,
};