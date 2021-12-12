const axios = require('axios');

// HELPER FUNCTIONS

const formatDate = (date) => {
  let day = date.toISOString().split('T')[0].split('-');
  day = [day[2], day[1], day[0]].join('-');
  const hour = date.toLocaleTimeString('en-US');
  return `${day} ${hour}`;
};

const sendRequest = async (chatMessage, nickname, date) => {
  const data = {
    message: chatMessage,
    nickname,
    timestamp: date,
  };
  await axios
    .post('http://localhost:3000/messages', data)
    .then((res) => console.log(`statusCode: ${res.status}`))
    .catch((e) => console.log(e));
};

const getPosts = async () => {
  const posts = await axios({
    method: 'get',
    url: 'http://localhost:3000/messages',
  })
  .then((response) => response.data);

  return posts;
};

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const oldData = await getPosts();
    socket.emit('getChatData', oldData);
    socket.emit('enterChat');

    socket.on('addOnlineUser', (user) => {
      io.emit('addOnlineUser', user);
    });

    socket.on('updateNickname', ({ user, newNickname }) => {
      io.emit('updateNickname', { user, newNickname });
    });
    
    socket.on('message', ({ chatMessage, nickname }) => {
      const date = formatDate(new Date(Date.now()));
      sendRequest(chatMessage, nickname, date);
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });
  });  
};
