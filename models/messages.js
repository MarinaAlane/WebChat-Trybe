const connection = require('./connection');

const create = async (data, nickname, chatMessage) => {
  const db = await connection();
  const result = await db.collection('messages').insertOne({ data, nickname, chatMessage });
  return result;
};

module.exports = {
  create,  
};