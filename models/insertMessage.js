const connection = require('./connection');

async function insertMessage(message) {
  const connect = await connection();
  const db = await connect.collection('messages');
  const { ops } = await db.insertOne(message);
  return ops[0];
}

module.exports = insertMessage;
