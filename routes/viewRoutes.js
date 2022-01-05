const express = require('express');

const router = express.Router();

const {
  getAllMessages,
} = require('../controllers/chatController');

router.get('/', async (req, res) => {
  const messages = await getAllMessages();
  res.render('chat', { messages });
});

module.exports = router;