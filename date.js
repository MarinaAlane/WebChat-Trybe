const getDate = (nickname, chatMessage) => {
    const date = new Date();
    const dateActual = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const timeActual = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const printDados = `${dateActual} ${timeActual} - ${nickname}: ${chatMessage}`;
    return printDados;
    };
    
    module.exports = { getDate };