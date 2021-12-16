const Messages = require('../models/messages');

const setMessage = async (msg) => {
  try {
    await Messages.setMessage(msg);
    return true;
  } catch (error) {
    console.error(error.message);
    return error;
  }
};

const getMessages = async () => {
  const messages = await Messages.getMessages();
  return messages;
};

module.exports = {
  setMessage,
  getMessages,
};