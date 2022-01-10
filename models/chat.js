const connection = require('./connection');

const getAllMessages = async () => {
  const allMessages = await connection().collection('messages').find().toArray();
  return allMessages;
  };

const createMsg = async (message) => {
 await connection().insertOne(message);
};

module.exports = { createMsg, getAllMessages };