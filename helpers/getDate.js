const moment = require('moment')();

module.exports = () => {
  const data = moment.locale('pt-br').format('L').replace(/\//g, '-');
  const time = moment.format('LTS');
  return `${data} ${time}`;
};
