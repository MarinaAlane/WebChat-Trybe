const connection = require('./connection');

const newMessageModel = async (message) => {
  const db = await connection();
  await db.collection('messages').insertOne(message);
};

module.exports = { newMessageModel };
