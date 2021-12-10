const getDate = (nickname, chatMessage) => {
const date = new Date();
const dataAtual = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
const horaAtual = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
const printDados = `${dataAtual} ${horaAtual} - ${nickname}: ${chatMessage}`;
return printDados;
};

module.exports = { getDate };