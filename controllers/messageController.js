const messageModel = require('../models/historyModel');

const messageRegister = async (message, nickname, timestamp) => {
  const result = await messageModel.messageRegister(message, nickname, timestamp);
  return result;
};

const getAllMessages = async () => {
  const messages = await messageModel.getAllMessage();
  return messages;
};

module.exports = {
 messageRegister,
 getAllMessages,
};
