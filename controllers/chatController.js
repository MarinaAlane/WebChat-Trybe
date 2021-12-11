const moment = require('moment');
const model = require('../models/chatModel.js');

const getAllMessages = async () => {
  const messages = await model.getAllMessages();
  return messages;
};

const createMessage = async (data) => {
  try {
    const timestamp = moment().format('DD-MM-YYYY HH:mm:ss');
    const response = await model.createMessage({ ...data, timestamp });
    const { message, nickname } = response.ops[0];
    return `${timestamp}-${nickname}-${message}`;
  } catch (e) {
    return e.message;
  }
};

module.exports = {
  getAllMessages,
  createMessage,
};
