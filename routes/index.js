const express = require('express');

const rootRouter = express.Router();

const homeController = require('../controllers/homeController');

rootRouter.get('/', homeController.get);

module.exports = rootRouter;
