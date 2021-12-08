const { getFormatTime } = require('../middleware/manageMessage');

const createMessage = ({ nickname, chatMessage }) => {
  const { timestamp, meridiem } = getFormatTime();

  return `${timestamp} ${meridiem} - ${nickname} ${chatMessage}`;
};

module.exports = {
  createMessage,
};
