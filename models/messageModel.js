const connection = require('./connection');

const saveMessage = async (message, nickname, date) => {
  const data = await connection();
  const result = await data.collection('messages').insertOne({ message, nickname, date });
  
  return result;
};

const getHistory = async () => {
  const data = await connection();
  const result = await data.collection('messages').find().toArray();

  return result;
};

module.exports = {
  saveMessage,
  getHistory,
};
