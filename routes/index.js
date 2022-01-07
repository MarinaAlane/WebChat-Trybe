const fs = require('fs');
const path = require('path');

const routes = {};

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => // filtra o file em q esta rodando e deixa .js files
     (file !== basename) && (file.slice(-3) === '.js')).forEach((file) => { // importa todas as routes
    const fileName = file.split('.')[0];
    routes[fileName] = require(path.join(__dirname, file));
  });

// console.log(routes);
module.exports = routes;
