const mongoConnection = require('./connection');

const saveMessage = async (messageData) => {
  const db = await mongoConnection();
  const response = await db.collection('messages').insertOne(messageData);
  return response;
};

const getAllMessages = async () => {
  const db = await mongoConnection();
  const response = await db.collection('messages').find().toArray();
  return response;
};

module.exports = {
  saveMessage,
  getAllMessages,
};
