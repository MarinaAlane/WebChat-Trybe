const router = require('express').Router();
const controller = require('../controllers/messageController');

router.post('/message', controller.messageRegister);
router.get('/message', controller.getAllMessages);

module.exports = router;
