const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);
    
    const currentDate = moment().format('DD-MM-yyyy hh:mm:ss A');

    socket.on('message', ({ nickname, chatMessage }) => {
        io.emit('message', `${currentDate} - ${nickname}: ${chatMessage}`);
    }); 
    
    const { id } = socket;
    const nickname = id.substring(0, 16);

    io.emit('nickSapo', nickname);
});
