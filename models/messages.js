const connection = require('./connection');

const col = 'messages';

const addMessage = async ({ formatedDate, nickname, chatMessage }) => {
  const db = await connection();
  await db.collection(col).insertOne({
    message: chatMessage,
    nickname,
    timestamp: formatedDate,
  }); 
};

const getAllMessages = async () => {
  const db = await connection();
  const Messages = await db.collection(col).find().toArray();

  return Messages;
};

module.exports = { addMessage, getAllMessages };