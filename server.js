// Faça seu código aqui
const express = require('express');

const app = express();
app.use(express.json());

app.use('/', (_req, res) => res.status(200).json({ message: 'OK' }));

const PORT = 3000;

app.listen(PORT, () => console.log(`API running on port: ${PORT}`));