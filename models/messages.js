const connection = require('./connection');

const COLLECTION = 'messages';
const getConnection = () => connection().then((db) => db.collection(COLLECTION));

const getAllMessages = async () => {
  const messagesConnection = await getConnection();
  const messages = await messagesConnection.find().toArray();
  return messages;
};

const insertMessage = async (message, nickname, timestamp) => {
  const messagesConnection = await getConnection();
  await messagesConnection.insertOne({ message, nickname, timestamp });
};

module.exports = {
  getAllMessages,
  insertMessage,
};
