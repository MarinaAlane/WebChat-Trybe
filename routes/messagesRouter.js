const router = require('express').Router();
const messagesController = require('../controller/messageController');

router.get('/', messagesController);

module.exports = router;
