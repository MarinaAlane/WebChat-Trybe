const router = require('express').Router();
const chat = require('../models/chat');

router.get('/', async (_req, res) => {
  const allMessages = await chat.getAll();
  return res.status(200).json(allMessages);
});

router.post('/', async (req, res) => {
  const insertOneMessage = chat.saveMessage(req.body);
  if (!insertOneMessage) {
    return res.status(404).json({ message: 'erro ao inserir mensagem' });
  }
  return res.status(200).json(insertOneMessage);
});

module.exports = router;
