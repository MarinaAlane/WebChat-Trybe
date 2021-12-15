const connection = require('./connection');

// {
//   message: 'Lorem ipsum',
//   nickname: 'xablau',
//   timestamp: '2021-04-01 12:00:00'
// }

const createMessage = async ({ message, nickname, timestamp }) => {
  const db = await connection();
  const addMessage = await db.collection('messages').insertOne({ message, nickname, timestamp });
  return addMessage;
};

const getAllMessages = async () => {
  const db = await connection();
  const response = await db.collection('messages').find().toArray();
  return response;
};

module.exports = { createMessage, getAllMessages };