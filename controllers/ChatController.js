const { Router } = require('express');

const ChatModel = require('../models/Chat');

const router = Router();

router.get('/', async (req, res) => {
  const chat = await ChatModel.getAll();
  res.status(200).json(chat);
});

module.exports = router;