const socket = window.io('http://localhost:3000');

let me = '';
const messages = document.getElementById('messages');

const sendUser = document.getElementById('send-user');
sendUser.addEventListener('click', () => {
  const userNickName = document.getElementById('user-nick-name');
  socket.emit('user_connect', ({ nickname: userNickName.value }));
  userNickName.disabled = true;
  sendUser.disabled = true;
});

socket.on('login_user', (mess) => {
  const online = document.getElementById('online');
  const liUser = document.createElement('li');
  liUser.innerText = mess;
  online.appendChild(liUser);
  const liMessage = document.createElement('li');
  liMessage.innerText = `${mess} Entrou`;
  liMessage.style.color = 'grey';
  liMessage.style.fontStyle = 'italic';
  liMessage.style.fontSize = '0.8em';
  messages.appendChild(liMessage);
});

socket.on('logged_user', (mess) => {
  me = mess;
  const online = document.getElementById('online');
  const liUser = document.createElement('li');
  liUser.innerText = mess;
  online.appendChild(liUser);
  const liMessage = document.createElement('li');
  liMessage.innerText = `Bem Vindo ${mess}`;
  liMessage.style.color = 'grey';
  liMessage.style.fontStyle = 'italic';
  liMessage.style.fontSize = '0.8em';
  messages.appendChild(liMessage);
});

function insertMessage(timestamp, nickname, chatMessage) {
  const dataTime = timestamp.split('T').join(' ').split('.')[0];
  const liMessage = document.createElement('li');
  liMessage.innerText = `${dataTime} - ${nickname}: ${chatMessage}`;
  messages.appendChild(liMessage);
}

const sendMessage = document.getElementById('send-message');
sendMessage.addEventListener('click', () => {
  const inputMessage = document.getElementById('input-message');
  console.log(me, inputMessage.value);
  socket.emit('send-message',
    ({ timestamp: new Date(), nickname: me, message: inputMessage.value }));
});

socket.on('message_user', ({ timestamp, nickname, message }) => {
  insertMessage(timestamp, nickname, message);
});
