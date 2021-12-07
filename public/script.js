// eslint-disable-next-line no-undef
const socket = io('http://localhost:3000');

const sendUser = document.getElementById('send-user');
sendUser.addEventListener('click', () => {
  const userNickName = document.getElementById('user-nick-name');
  socket.emit('conect', ({ nickname: userNickName.value }));
  userNickName.disabled = true;
  sendUser.disabled = true;
});

socket.on('login_user', (user) => {
  const online = document.getElementById('online');
  const liUser = document.createElement('li');
  liUser.innerText = user;
  online.appendChild(liUser);
  const messages = document.getElementById('messages');
  const liMessage = document.createElement('li');
  liMessage.innerText = `${user} entrou!!`;
  liMessage.style.color = 'grey';
  liMessage.style.fontStyle = 'italic';
  liMessage.style.fontSize = '0.8em';
  messages.appendChild(liMessage);
});
