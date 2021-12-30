const moment = require('moment');

const formatDate = () => moment().format('DD-MM-yyyy HH:mm:ss');

module.exports = { formatDate };