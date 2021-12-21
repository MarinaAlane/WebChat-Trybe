// ..source: https://github.com/tryber/sd-011-project-webchat/blob/luiz-wendel-webchat-project/sockets/messageSocket.js

const moment = require('moment');

const getFormatTime = () => {
  const date = moment();
  const formatDate = date.format('DD-MM-YYYY hh:mm:ss A');
  return { timestamp: formatDate };
};

module.exports = {
  getFormatTime,
};
