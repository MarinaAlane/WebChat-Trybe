const connection = require('./connection');

const create = async (messageInfo) => {
  const db = await connection();
  const createResponse = await db.collection('messages').insertOne(messageInfo);
  return createResponse;
};

const getAll = async () => {
  const db = await connection();
  const allMessages = await db.collection('messages').find({}).toArray();
  return allMessages;
};

module.exports = {
  create,
  getAll,
};