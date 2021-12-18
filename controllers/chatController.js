const moment = require('moment');
const model = require('../models/chatModel.js');

const getMessages = async () => {
  const messages = await model.getAllMessages();
  return messages.map(
    (message) => `${message.timestamp}-${message.nickname}-${message.message}`,
  );
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

const cleanMessageList = async () => {
  try {
    const response = await model.cleanMessageList();
    return response;
  } catch (e) {
    return e.message;
  }
};

module.exports = {
  getMessages,
  createMessage,
  cleanMessageList,
};
