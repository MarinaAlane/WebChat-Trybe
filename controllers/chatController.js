const { Router } = require('express');
const { getAll, saveMessage } = require('../models/chatModel');

const router = Router();

router.get('/webchat', async (_req, res) => {
  try {
    const webchat = await getAll();
    return res.status(200).json(webchat);    
  } catch (error) {
    return error.message;
  }
});

router.post('/', async (req, res) => {
  try {
    const webchat = await saveMessage(req.body);
    return res.status(200).json(webchat);    
  } catch (error) {
    return error.message;
  }
});

module.exports = router;
