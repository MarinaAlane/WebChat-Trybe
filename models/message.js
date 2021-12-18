const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const msg = await db.collection('messages').find().toArray();
  return msg;
};

const createMessage = async ({ data, nickname, chatMessage }) => {
  const db = await connection();
  const messages = await db.collection('messages').insert({
    data,
    nickname,
    chatMessage,
  });
  return messages;
};

module.exports = {
  getAll,
  createMessage,
};
