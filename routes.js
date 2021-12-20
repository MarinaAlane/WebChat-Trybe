const express = require('express');

const Route = express.Router();

Route.get('/', (_req, res) => {
  res.sendFile('/index.html');
});

module.exports = Route;
