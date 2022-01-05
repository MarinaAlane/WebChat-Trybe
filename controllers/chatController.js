const chatModel = require('../models/chatModels');

const createNewMessage = async (message, nickname, timestamp) => {
  await chatModel.createNewMessage(message, nickname, timestamp);
};

const getAllMessages = async () => {
  const result = await chatModel.getAllMessages();

  return result;
};

module.exports = {
  createNewMessage,
  getAllMessages,
};