const express = require('express');
const path = require('path');

const Route = express.Router();

Route.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

module.exports = Route;
