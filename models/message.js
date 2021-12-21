const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const msg = await db.collection('messages').find().toArray();
  return msg;
};

const createMessage = async ({ fulldate, nickname, chatMessage }) => {
  const db = await connection();
  const messages = await db.collection('messages').insertOne({
    fulldate,
    nickname,
    chatMessage,
  });
  return messages;
};

module.exports = {
  getAll,
  createMessage,
};
