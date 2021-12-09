const connection = require('./connection');

const setMsg = async ({ date, nickname, chatMessage }) => {
  const db = await connection();
  const attMsgs = await db.collection('messages').insertOne({ date, nickname, chatMessage });
  return attMsgs;
};

const getMsg = async () => {
  const db = await connection();
  const allMsgs = await db.collection('messages').find().toArray();
  return allMsgs;
};

module.exports = {
  setMsg,
  getMsg,
};