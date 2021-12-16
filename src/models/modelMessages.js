const connection = require('./connection');

const COLLECTION_NAME = 'messages';

const getAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection(COLLECTION_NAME).find().toArray();
  return messages;
};

const createMessages = async (item) => {
  const db = await connection();
  await db.collection(COLLECTION_NAME).insertOne(item);
  return true;
};

module.exports = {
  getAllMessages,
  createMessages,
};