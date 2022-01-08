const express = require('express');
const http = require('http');
const server = http.createServer(app);

const app = express();
const PORT = 3000;

app.get('/', (_req, res) => {
    res.status(400).json({ message: 'Working!' })
})

server.listen(PORT, () => console.log(`Server conected on port ${PORT}!`));