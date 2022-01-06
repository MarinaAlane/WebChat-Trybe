const messagesModels = require('../models/messagesModels');

const createMessages = async (nickname, message, timestamp) => { // Req. 3 - cria as mensagens e armazena no banco
  await messagesModels.createMessages(nickname, message, timestamp);
};

const listAllMessages = async () => { // Req. 3 - lista as mensagens armazenadas no banco
  const messages = await messagesModels.getAllMessages();
  return messages;
};

module.exports = {
  createMessages,
  listAllMessages,
};