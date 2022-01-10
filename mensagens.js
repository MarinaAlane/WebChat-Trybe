const moment = require('moment');
const { create } = require('./models/mensagens');

const createMessage = async (message, nickname) => {
  const timestamp = moment().format('DD-MM-yyyy LTS');
  await create({ timestamp, message, nickname });
  return `${timestamp} ${nickname} ${message}`;
};

module.exports = createMessage;
