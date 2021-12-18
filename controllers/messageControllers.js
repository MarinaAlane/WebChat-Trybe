const msgModels = require('../models/messageModels');

const getAllMessages = async () => {
    const getMessages = await msgModels.getAllMessages();
    return getMessages;
};

const saveMessages = async (msgData) => {
    await msgModels.saveMessages(msgData);
};

module.exports = {
  getAllMessages,
  saveMessages,
};