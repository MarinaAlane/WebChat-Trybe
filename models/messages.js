const connection = require('./connection');

const getAllMessages = async () => {
  const connect = await connection();
  const response = await connect.collection('messages')
  .find({}, { projection: { _id: 0 } }).toArray();
  return response;
};

const insertMessage = async (message) => {
  const connect = await connection();
  const response = await connect.collection('messages').insertOne(message);
  return response.ops[0];
};

module.exports = {
  getAllMessages,
  insertMessage,
};