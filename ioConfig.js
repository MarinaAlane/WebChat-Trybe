module.exports = async (io) => {
     const allMessages = await findMessages();
    io.emit('dbMessages', allMessages);

    socket.on('message', async (msg) => {
        const { nickname, chatMessage } = msg;
        const { formatDate } = dataConfig;
        const saveMessages = await saveChat(nickname, chatMessage, formatDate);
        io.emit('message', `${formatDate} ${nickname}: ${chatMessage}`);
        console.log('Mensagens salvas', saveMessages);
    });

    socket.on('onlineUserOn', (msg) => {
        io.emit('onlineUserOn', { mensagem: msg, socket: socket.id });
    });

    socket.on('newNickName', (msg) => {
        io.emit('newNickName', { newNick: msg, socket: socket.id });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('disconectou', socket.id);
    });
});