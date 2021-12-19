const mongoConnection = require('./connection');

async function saveMessages(nickname, message, timestamp) {
  const db = await mongoConnection();
  await db.collection('messages').insertOne({ nickname, message, timestamp });
}

async function getMessages() {
  const db = await mongoConnection();
  const msg = await db.collection('messages').find().toArray();
  return msg;
}

module.exports = {
  saveMessages,
  getMessages,
};