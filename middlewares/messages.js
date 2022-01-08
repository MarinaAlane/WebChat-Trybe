const messagesModels = require('../models/messages');

const createMessages = async (nickname, message, timestamp) => {
  await messagesModels.createMessages(nickname, message, timestamp);
  return null;
};

const listAllMessages = async () => messagesModels.getAllMessages();

module.exports = {
  createMessages,
  listAllMessages,
};
