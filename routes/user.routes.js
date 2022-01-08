const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.newMessage);

router.get('/', (req, res) => {
  res.render('main');
});
module.exports = router;
