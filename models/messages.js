const connection = require('../connection/connection');

const getAllMessages = async () => {
  const connect = await connection();
  const result = await connect.collection('messages')
  .find({}, { projection: { _id: 0 } }).toArray();
  return result;
};

const createMessage = async (message) => {
  const connect = await connection();
  const result = await connect.collection('messages').insertOne(message);
  return result.ops[0];
};

module.exports = {
  getAllMessages,
  createMessage,
};
