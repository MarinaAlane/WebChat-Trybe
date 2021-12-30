const model = require('../models/message');

const getMessages = async () => {
  const messages = await model.getMessages();
  return messages.map((message) => {
    const { _id, ...newMessage } = message;
    return newMessage;
  });
};

const addMessage = async (message) => {
  await model.addMessage(message);
  const messages = await getMessages();
  return messages;
};

module.exports = {
  getMessages,
  addMessage,
};