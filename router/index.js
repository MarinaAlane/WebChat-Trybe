const router = require('express').Router();
const path = require('path');
const controller = require('../controller');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});
router.post('/', controller.saveMessage);

module.exports = router;
