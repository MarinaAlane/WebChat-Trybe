const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getHistory);
module.exports = router;
