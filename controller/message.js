const messagesModel = require('../model/messages');

const { getFormatTime } = require('../middleware/manageMessage');

const createMessage = async ({ nickname, chatMessage }) => {
  const { timestamp } = getFormatTime();
  await messagesModel.create(chatMessage, nickname, timestamp);
  const msg = `${timestamp} - ${nickname}: ${chatMessage}`;
  return msg;
};

const getAll = async () => {
  const response = await messagesModel.getAll();
  const arr = [];
  response.forEach(({ message, nickname, timestamp }) => {
    const msg = `${timestamp} - ${nickname}: ${message}`;
    arr.push(msg);
  });
  // console.log(arr);
  return arr;
};

module.exports = {
  createMessage,
  getAll,
};
