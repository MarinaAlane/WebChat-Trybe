module.exports = (io) => io.on('connection', (socket) => {
    socket.on('message', (chatMessage, nickname) => {
        io.emit('serverMessage', chatMessage);
    });
});
