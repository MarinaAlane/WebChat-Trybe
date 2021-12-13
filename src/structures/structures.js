const moment = require('moment');

const newDate = () => {
  const date2 = moment().format('DD-MM-YYYY hh:mm:ss A');
  return date2;
}; 
module.exports = { newDate };