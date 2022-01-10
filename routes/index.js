const router = require('express').Router();
const msgController = require('../controller');

router.get('/', msgController);

module.exports = router;