const { Router } = require('express');

const webChat = require('../models/webChatModel');

const router = Router();

router.get('/', async (req, res) => {
  const chat = await webChat.getAll();
  res.status(200).json(chat);
});

module.exports = router;
