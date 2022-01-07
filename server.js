require('dotenv').config();
const server = require('./app');

const port = 3000;
// const { PORT = 3000 } = process.env;

server.listen(port, () => {
  console.log(`Servidor online na porta ${port}`);
});
