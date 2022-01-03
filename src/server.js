const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const path = require('path');

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(`${__dirname}/views`)));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/index.html'));
});

http.listen(PORT, () => console.log(`App listening on port -> ${PORT}`));
