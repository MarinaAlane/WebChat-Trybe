const moment = require('moment');
const chatModel = require('./models/chat');

const onLineUsers = {};

module.exports = (io) => io.on('connection', async (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);

    onLineUsers[socket.id] = socket.id.substring(0, 16);
    io.emit('newNickName', onLineUsers);

    const allMessages = await chatModel.getAllMessages();
    io.emit('allMessages', allMessages);
    
    socket.on('message', ({ chatMessage, nickname }) => {
        const timeStamp = moment().format('DD-MM-yyyy hh:mm:ss A');
        chatModel.createMessage({ message: chatMessage, nickname, timeStamp });
        io.emit('message', ` ${timeStamp} - ${nickname}: ${chatMessage}`); 
    }); 

    socket.on('disconnect', () => {
        delete onLineUsers[socket.id];
        io.emit('newNickName', onLineUsers);
    });

    socket.on('sendNickName', (nick) => {
        onLineUsers[socket.id] = nick;
        io.emit('newNickName', onLineUsers);
    });
});
