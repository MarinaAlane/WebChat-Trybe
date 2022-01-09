const saveChat = require('./models/chatModel');

async function serverIo(timestamp, msg, io) {
    const { nickname, chatMessage } = msg;
    const saveMessages = await saveChat(nickname, chatMessage, timestamp);
    io.emit('message', `${timestamp} ${nickname}: ${chatMessage}`);
    console.log('Mensagens salvas', saveMessages);
}

module.exports = {
    serverIo,
};