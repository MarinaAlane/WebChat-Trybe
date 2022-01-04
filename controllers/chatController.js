const { Router } = require('express');
const { getAll, saveMessage } = require('../models/chatModel');

const router = Router();

router.get('/webchat', async (_req, res) => {
  const webchat = await getAll();
  return res.status(200).json(webchat);
});

router.post('/', async (req, res) => {
  const webchat = await saveMessage(req.body);
  return res.status(200).json(webchat);
});

module.exports = router;
