const router = require('express').Router();
const {
  getAllMessages,
  setMessage,
} = require('../models/service');

router.get('/chat', async (_req, res) => {
  const allMessages = await getAllMessages();
  return res.status(200).json(allMessages);
});

router.post('/chat', async (req, res) => {
  try {
    const insertOneMessage = await setMessage(req.body);
    if (!insertOneMessage) {
      return res.status(404).json({ message: 'erro interno' });
    }
    return res.status(200).json(insertOneMessage);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;