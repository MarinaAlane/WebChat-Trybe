const MessageModel = require('../models/messageModel');

const createMessage = async (objMessage) => {
  const { chatMessage, nickname } = objMessage;
  const date = new Date();
  const actualDate = date.toLocaleString();
  const msgDate = actualDate.replace(/['/']/g, '-');
  const message = `${msgDate.toString()} - ${nickname}: ${chatMessage}`;
  await MessageModel.saveMessage({
    message: chatMessage,
    nickname,
    timestamp: msgDate.toString(),
  });
  return message;
};

const getAll = async () => {
  const messages = await MessageModel.getAll();
  const arrayMessages = messages
    .map((message) => `${message.timestamp} - ${message.nickname}: ${message.message}`);
  return arrayMessages;
};

module.exports = {
  createMessage,
  getAll,
};