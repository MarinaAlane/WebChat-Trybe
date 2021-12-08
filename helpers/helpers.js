const moment = require('moment');

function dateGenerator() {
  const date = moment().format('DD-MM-YYYY h:mm:ss A');
  return date;
}

module.exports = { dateGenerator };
