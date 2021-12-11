const moment = require('moment');

const timeFormat = moment().format('DD-MM-YYYY h:mm:ss A');

const generateMessage = ({ nickname, chatMessage }) => ({
  nickname,
  chatMessage,
  createdAt: timeFormat,
});

module.exports = { generateMessage };
