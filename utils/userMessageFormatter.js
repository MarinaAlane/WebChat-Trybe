const moment = require('moment');

module.exports = (user, message) => {
  const date = moment().format('DD-MM-YYYY h:mm:ss A');
  return `${date} - ${user}: ${message}`;
};