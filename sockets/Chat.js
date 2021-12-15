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

let onlineUsers = [];

const entering = async (socket) => {
  const user = `_${socket.id.substring(0, 15)}`;
  onlineUsers.push({ user, nickname: user });
  const oldData = await getPosts();
  socket.emit('getChatData', oldData);
  socket.emit('enterChat', onlineUsers);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    entering(socket);

    socket.on('addOnlineUser', (user) => socket.broadcast.emit('addOnlineUser', user));

    socket.on('updateNickname', ({ user, newNickname }) => {
      io.emit('updateNickname', { user, newNickname });
      onlineUsers.find((onlineUser) => onlineUser.user === user).nickname = newNickname;
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      const date = formatDate(new Date(Date.now()));
      sendRequest(chatMessage, nickname, date);
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });

    socket.on('disconnect', () => {
      io.emit('leaveChat', `_${socket.id.substring(0, 15)}`);
      onlineUsers = onlineUsers.filter((user) => user.user !== `_${socket.id.substring(0, 15)}`);
    });
  });  
};
