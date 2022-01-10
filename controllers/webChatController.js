const webChatModel = require('../models/webChatModel');

const saveMessages = async ({ timeStamp, nickname, chatMessage }) => {
  const savedMessages = await webChatModel.saveMessages({ timeStamp, nickname, chatMessage });
  return savedMessages;
};
const getMessagesHistory = async () => {
  const messagesLog = await webChatModel.getMessagesHistory();
  return messagesLog;
};

module.exports = {
  saveMessages,
  getMessagesHistory,
};