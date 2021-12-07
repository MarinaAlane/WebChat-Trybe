const express = require('express');

const rootRouter = express.Router();

rootRouter.get('/', (_request, response) => response.render('pages/index'));

module.exports = rootRouter;
