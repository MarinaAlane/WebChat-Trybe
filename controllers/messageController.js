const MessageModel = require('../models/messageModel');

const storeMessage = async (data) => {
  await MessageModel.storeMessage(data);
};

const getMessages = async () => {
  const messageHistory = await MessageModel.getMessages();
  return messageHistory;
};

module.exports = {
  storeMessage,
  getMessages,
};
