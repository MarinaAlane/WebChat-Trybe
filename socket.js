const moment = require('moment');

const onLineUsers = {};

module.exports = (io) => io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);

    const { id } = socket;
    const nickId = id.substring(0, 16);

    onLineUsers[socket.id] = nickId;
    io.emit('sendNick', onLineUsers[socket.id]);
    
    const currentDate = moment().format('DD-MM-yyyy hh:mm:ss A');

    socket.on('message', ({ nickname, chatMessage }) => {
        io.emit('message', ` ${currentDate} - ${onLineUsers[nickname]}: ${chatMessage}`); 
    }); 

    socket.on('sendNickName', (nick) => {
        onLineUsers[socket.id] = nick;
        io.emit('newNickName', onLineUsers);
    });
});
