// module.exports = (io) => io.on('connection', (socket) => {
//   console.log(`a user ${socket.id} connected`);
//   socket.on('message', (message) => {
//     console.log(message);
//     const data = createMessage();
//     io.emit('message', `${data} ${message.nickname}: ${message.chatMessage}`);
//   });
// });