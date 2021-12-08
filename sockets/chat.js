// const axios = require('axios');
const { create } = require('../models/messageModel');

module.exports = (socket, io) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    // axios.post('https://localhost:3000', { message: chatMessage, nick })
    // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth()).padStart(2, '0');
    const year = today.getFullYear();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();
    const fullDate = `${day}-${month}-${year} ${hour}:${minute}:${second}`;
    await create({ 
      message: chatMessage, 
      nickname,
      timestamp: `${year}-${month}-${day} ${hour}:${minute}:${second}`, 
    });
    io.emit('message', `${fullDate} - ${nickname}: ${chatMessage}`);
  });
};