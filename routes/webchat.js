const router = require('express').Router();
const { webchatController } = require('../controllers');

router.get('/', webchatController.getChat);

module.exports = router;