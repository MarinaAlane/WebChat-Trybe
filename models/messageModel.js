const { connection } = require('./connection');

const formatedDate = require('../utils/formatedDate');

const getDb = async () => {
  const data = await connection();
  const db = await data;
  const collection = await db.collection('messages');
  return collection;
};

const addMessage = async ({ chatMessage, nickname }) => {
  const db = await getDb();

  await db.insertOne({ nickname, message: chatMessage, timestamp: formatedDate() });
};

const getMessages = async () => {
  const db = await getDb();

  return db.find().toArray();
};

module.exports = {
  addMessage,
  getMessages,
};
