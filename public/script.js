const socket = window.io('http://localhost:3000');

const messages = document.getElementById('messages');
const sendUser = document.getElementById('send-user');
const sendMessage = document.getElementById('send-message');

function addNickName(nickname) {
  sessionStorage.setItem('nickname', nickname);
}

function getNickname() {
  return sessionStorage.getItem('nickname');
}

socket.on('id', (newId) => {
  addNickName(newId);
});

sendUser.addEventListener('click', () => {
  const userNickName = document.getElementById('user-nick-name');
  socket.emit('user_connect', (userNickName.value));
  addNickName(userNickName.value);
});

socket.on('login_user', (id) => {
  const online = document.getElementById('online');
  const liUser = document.createElement('li');
  liUser.innerText = id;
  online.appendChild(liUser);
  const liMessage = document.createElement('li');
  liMessage.innerText = `${id} Entrou`;
  liMessage.style.color = 'grey';
  liMessage.style.fontStyle = 'italic';
  liMessage.style.fontSize = '0.8em';
  messages.appendChild(liMessage);
});

socket.on('logged_user', (id) => {
  addNickName(id);
  const online = document.getElementById('online');
  const liUser = document.createElement('li');
  liUser.innerText = id;
  online.appendChild(liUser);
  const liMessage = document.createElement('li');
  liMessage.innerText = `Bem Vindo ${id}`;
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

sendMessage.addEventListener('click', () => {
  const inputMessage = document.getElementById('input-message');
  socket.emit('send-message',
    ({ timestamp: new Date(), nickname: getNickname(), message: inputMessage.value }));
});

socket.on('message_user', ({ timestamp, nickname, message }) => {
  insertMessage(timestamp, nickname, message);
});
