const messagesModel = require('../model/messages');

const createMessage = async ({ nickname, chatMessage }, timestamp) => {
  await messagesModel.create(chatMessage, nickname, timestamp);
};

const getAllMessages = async () => {
  const messages = await messagesModel.getAllMessages();
  return messages;
};

module.exports = {
  createMessage,
  getAllMessages,
};
