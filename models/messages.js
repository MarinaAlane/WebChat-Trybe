const connection = require('./connection');

const getAllMessages = async () => {
  const messages = await connection();
  const result = await messages.collectiop('messages')
    .find({}, { projection: { _id: 0 } }).toArray();
  return result;
};

module.exports = {
  getAllMessages,
};