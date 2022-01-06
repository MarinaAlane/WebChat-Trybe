const express = require('express');

const rootRouter = express.Router();

rootRouter.get('/', (_req, res) => res.render('index'));

module.exports = rootRouter;