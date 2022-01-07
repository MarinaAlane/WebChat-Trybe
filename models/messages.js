const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  const result = await db
    .collection('messages')
    .find({}, { projection: { _id: 0 } })
    .toArray();
  return result;
};

const createMessage = async (message) => {
  const db = await connection();
  const result = await db
    .collection('messages')
    .insertOne(message);
  return result.ops[0];
};

module.exports = {
  getAllMessages,
  createMessage,
};
