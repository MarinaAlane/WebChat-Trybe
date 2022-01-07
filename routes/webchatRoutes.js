const express = require('express');

const chatLoginController = require('../controllers/webchatController');
// fica de modelo pra um proximo projeto
// const bodyValidation = require('../middlewares/bodyValidation');
// const userSchema = require('../schemas/userSchema');

const router = express.Router();

router.get('/', chatLoginController.renderChat);

module.exports = router;