const socket = window.io('localhost:3000');

let nickname = 'default';
let chatMessage = '';

const nicknameForm = document.querySelector('#formUserNickname');
nicknameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.target[0];
  nickname = input.value;
  // socket.emit('changeNickname', input.value);
  input.value = '';
  return false;
});

const messageForm = document.querySelector('#userFormMessage');
messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.target[0];
  chatMessage = input.value;
  socket.emit('message', { nickname, chatMessage });
  input.value = '';
  return false;
});

const createMessage = (message) => {
  const li = document.createElement('li');
  const screen = document.querySelector('#screenMessage');
  li.innerText = message;
  screen.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
// socket.on('userConnected', (message) => );
