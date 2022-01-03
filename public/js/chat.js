const socket = window.io();

const formMsg = document.querySelector('#message');
const formNick = document.querySelector('#nick');
const nick = document.querySelector('#nickName');
const nickBox = document.querySelector('#nick-name-box');
const msg = document.querySelector('#messageInput');

const getRandomNumb = () => {
  let result = Math.floor(Math.random() * 75) + 48;
  if (
      (result > 57 && result < 65)
      || (result > 90 && result < 97)
  ) result = getRandomNumb();

  return result;
};

function getRandomNick() {
  const arrOfRandNumb = Array.from({ length: 16 }, getRandomNumb);
  const newNick = String.fromCharCode(...arrOfRandNumb);
  
  return newNick;
}

if (nick.innerText === '') nick.innerText = getRandomNick();
formNick.addEventListener('submit', (e) => {
  e.preventDefault();
  nick.innerText = nickBox.value;
});

formMsg.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: msg.value, nickname: nick.innerText });
  msg.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

// socket.on('message', (messages) => messages.map(
//   (message) => createMessage(message),
// ));
socket.on('message', (message) => createMessage(message));
