const socket = window.io();
const sendMessageForm = document.querySelector('#send-message-form');
const saveNicknameForm = document.querySelector('#save-nickname-form');
let nickname = '';

sendMessageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const messageInput = document.querySelector('#client-message');
  socket.emit('clientMessage', messageInput.value);
  messageInput.value = '';
});

saveNicknameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nicknameInput = document.querySelector('#nickname');
  nickname = nicknameInput.value;
  socket.emit('clientNickname', nickname);
  nicknameInput.value = '';
});

const getActualDateFormated = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const actualDate = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
  if (hour > 12) return actualDate.concat(' PM');
  return actualDate.concat(' AM');
};

const createMessage = (message) => {
  const fullMessage = `${getActualDateFormated()} - ${nickname}: ${message}`;
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = fullMessage;
  messagesUl.appendChild(li);
};

const createNickname = (nick) => {
  const nicknameUl = document.querySelector('#nicknames');
  const li = document.createElement('li');
  li.innerText = nick;
  nicknameUl.appendChild(li);
};

socket.on('serverMessage', (message) => createMessage(message));
socket.on('serverNickname', (nick) => createNickname(nick));
