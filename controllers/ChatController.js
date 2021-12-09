const { Router } = require('express');

const { getAll, saveMessage } = require('../models/Chat');

const router = Router();

router.get('/chat', async (_req, res) => {
  const chat = await getAll();
  return res.status(200).json(chat);
});

router.post('/', async (req, res) => {
  const chat = await saveMessage(req.body);
  return res.status(200).json(chat);
});

module.exports = router;