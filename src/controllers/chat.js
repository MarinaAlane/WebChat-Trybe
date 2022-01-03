const { Router } = require('express');
const { getAllMsg, saveMessages } = require('../../models');

const router = Router();
router.get('/chat', async (req, res) => 
  res.status(200).json(await getAllMsg()));

router.post('/', async (req, res) => 
  res.status(200).json(await saveMessages(req.body)));

module.exports = router;
