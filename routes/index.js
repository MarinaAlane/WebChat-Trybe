const router = require('express').Router();
const controllerMessages = require('../controllers');

router.get('/', controllerMessages);

module.exports = router;
