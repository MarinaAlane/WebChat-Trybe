const connection = require('./connection');

const getAllMessages = async () => {
  const database = await connection();
  const result = database.collection('messages').find().toArray();
  return result;
  };

const createMsg = async (message) => {
  const database = await connection();
  const result = database.collection('messages').insertOne(message);
return result;
};

module.exports = { createMsg, getAllMessages };