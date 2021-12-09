const connection = require('./connection');

const create = async (chatMessage, nickname, date) => {
  console.log('cheguei no model');
  const db = await connection();
  await db.collection('messages').insertOne({ message: chatMessage, nickname, timestamp: date });
};

module.exports = { create };