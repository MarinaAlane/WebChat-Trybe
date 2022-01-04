// ..Souce: https://momentjs.com/docs/

const moment = require('moment');

const createTimestamp = () => {
  const formattedDate = moment().format('DD-MM-yyyy hh:mm:ss A');
  return formattedDate;
};

module.exports = {
  createTimestamp,
};
