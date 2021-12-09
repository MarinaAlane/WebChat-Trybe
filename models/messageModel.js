const connection = require('./connection');
const getBrazilianDate = require('../utils/getBrazilianDate');

const storeMessage = async (data) => {
  const { nickname, chatMessage } = data;
  const anyMessage = {
    message: chatMessage,
    nickname,
    timestamp: getBrazilianDate(),
  };

  const messages = await connection()
    .then((db) => db.collection('messages'));
  
  await messages.insertOne(anyMessage);
};

const getMessages = async () => {
  const messageHistory = await connection()
    .then((db) => db.collection('messages').find().toArray());
  return messageHistory;
};

module.exports = {
  storeMessage,
  getMessages,
};
