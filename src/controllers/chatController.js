const { Router } = require('express');
const { getAll, saveMessages } = require('../../models');

const router = Router();

router.get('/chat', async (req, res) => res.status(200).json(await getAll()));

router.post('/', async (req, res) => res.status(200).json(await saveMessages(req.body)));

module.exports = router;
