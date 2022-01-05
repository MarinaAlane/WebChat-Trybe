const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

const createNewMessage = async ({ message, nickname, timestamp }) => {
  const db = await connection();
  const inserted = await db.collection('messages').insertOne({ message, nickname, timestamp });
  return { _id: inserted.insertedId, message, nickname, timestamp };
};

module.exports = { getAllMessages, createNewMessage };
