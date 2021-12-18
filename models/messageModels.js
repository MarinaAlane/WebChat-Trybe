const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  const getMessages = await db.collection('messages').find().toArray();
 // console.log(getMessages, 'GETMESSAGES-MODELS');
  return getMessages;
};

const saveMessages = async (msgData) => {
  const { nickname, chatMessage, timestamp } = msgData;
  const db = await connection();
  await db.collection('messages').insertOne({ message: chatMessage, nickname, timestamp });
};

module.exports = {
  saveMessages,
  getAllMessages,
};