const express = require('express');
const path = require('path');

const app = express();

const routes = require('./routes');

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/views')));
app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/js')));
app.use(routes);

module.exports = app;