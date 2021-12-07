const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

function generateRandomNickname() {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let nickname = '';
  for (let i = 0; i < 16; i += 1) {
    nickname += characters[Math.floor(Math.random() * characters.length)];
  }
  sessionStorage.setItem('nickname', nickname);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  const p = document.createElement('p');
  p.innerText = `${message}`;
  li.appendChild(p);
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

window.onbeforeunload = () => {
  socket.disconnect();
  generateRandomNickname();
};