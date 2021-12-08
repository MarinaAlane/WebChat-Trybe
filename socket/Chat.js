const moment = require('moment');
// const messages = [];
// const users = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('new connection');
    const id = socket.id.substring(0, 16);
    io.emit('connection', id);

    socket.on('message', ({ chatMessage, nickname }) => {
      const date = moment(new Date()).format('DD-MM-yyyy h:mm:ss A');
      const inform = `${date} - ${nickname}: ${chatMessage}`;
      io.emit('message', inform);
    });
    // socket.emit('update_messages', messages);
  
    // socket.on('new_user', (data) => {
    //   console.log(data);
    //   users.push(data);
    //   io.emit('update_users', users);
    //   io.emit('update_messages', messages);
    // });
  
    // socket.on('new_message', (data) => {
    //   console.log(data);
    //   messages.push(data);
    //   io.emit('update_users', users);
    //   io.emit('update_messages', messages);
    // });
  });
};
