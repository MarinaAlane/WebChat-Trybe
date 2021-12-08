const router = require('express').Router();
const chat = require('../models/chat');

router.get('/chat', async (_req, res) => {
  const allMessages = await chat.getAll();
  return res.status(200).json(allMessages);
});

router.post('/chat', async (req, res) => {
  try {
    const insertOneMessage = await chat.saveMessage(req.body);
    if (!insertOneMessage) {
      return res.status(404).json({ message: 'erro ao inserir mensagem' });
    }
    return res.status(200).json(insertOneMessage);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: error.message });
  }
});

module.exports = router;
