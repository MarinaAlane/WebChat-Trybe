const connection = require('./connection');

const COLLECTION_NAME = 'messages';

const insert = async ({ message, nickname, timestamp }) => {
  const db = await connection();
  const collection = await db.collection(COLLECTION_NAME);

  await collection.insertOne({ message, nickname, timestamp });
};

const getAll = async () => {
  const db = await connection();
  const collection = await db.collection(COLLECTION_NAME);
  const messages = await collection.find().toArray();

  return messages;
};

module.exports = {
  insert,
  getAll,
};
