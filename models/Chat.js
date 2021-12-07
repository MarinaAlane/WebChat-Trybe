const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const chats = await db.collection('chat').find({}).toArray();
  return chats;
};

const saveMessage = async (timestamp, nickname, message) => {
  const db = await connection();
  const insertedChat = await db.collection('chat').insertOne({
    message, nickname, timestamp,
  });
  return insertedChat;
};

module.exports = {
  getAll,
  saveMessage,
};
