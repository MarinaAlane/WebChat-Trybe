const route = require('express').Router();
const { saveMessage, getHistory } = require('../controllers/messageController');

route.post('/', saveMessage);
route.get('/', getHistory);

module.exports = route;
