const conn = require('./connection');

const saveMessage = async (msg) => {
  const db = await conn();
  const messages = await db.collection('messages').insertOne(msg);
  return messages;
};

const getAllMessages = async () => {
const db = await conn();
const messages = await db.collection('messages').find().toArray();
return messages;
};

module.exports = {
getAllMessages,
saveMessage,
}; 