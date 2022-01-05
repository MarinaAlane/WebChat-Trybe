const express = require('express');

const route2Root = express.Router();

const mainPage = require('../controllers/mainPage');

route2Root.get('/', mainPage.get);
module.exports = route2Root;
