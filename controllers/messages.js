const Messages = require('../services/messages');

const setMessage = async (msg) => {
  try {
    await Messages.setMessage(msg);
    return false;
  } catch (error) {
    console.error(error.message);
  }
};

const getMessages = async () => {
  try {
    const messages = await Messages.getMessages();
    return messages;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { 
  setMessage,
  getMessages,
};