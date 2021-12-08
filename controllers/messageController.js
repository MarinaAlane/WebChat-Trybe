const messageModel = require('../models/messageModel');

const createMessage = async (message, nickname, timestamp) => {
  const response = await messageModel.createMessage(message, nickname, timestamp);

  return response;
};

const getMessages = async () => {
  const response = await messageModel.getMessages();

  return response;
};

module.exports = {
  createMessage,
  getMessages,
};
