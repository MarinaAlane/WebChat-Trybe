const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

app.use(cors());