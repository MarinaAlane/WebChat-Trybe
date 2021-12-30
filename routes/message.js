const router = require('express').Router();
const { addMessage, getMessages } = require('../middlewares/message');

router.get('/', getMessages);
router.post('/', addMessage);

module.exports = router;