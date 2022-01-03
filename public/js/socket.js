const socket = window.io();

const form = document.querySelector('#form');
const inputMessage = document.querySelector('#messageInput');
const input = document.querySelector('#nameInput');
const inputNameTag = document.querySelector('#name-tag');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputMessage.value === '') return false;
  socket.emit('messages', inputMessage.value);
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const today = new Date().toLocaleString('pt-BR', { hour12: true });
  const ul = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  // console.log('socket', message);
  if (message.message) {
    li.innerText = message.message;
  } else {
    li.innerText = `${today} ${message.nickname}: ${message.chatMessage}`;
  }
  ul.appendChild(li);
  window.scrollTo(0, document.querySelector('#div-message').scrollHeight);
};
// https://www.w3schools.com/jsref/jsref_tolocalestring.asp

input.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputNameTag.value === '') return false;
  socket.emit('name', inputNameTag.value);
  inputNameTag.value = '';
  inputNameTag.setAttribute('disabled', 'true');
  return false;
});

const inputName = (name) => {
  // console.log('input', name);
  const div = document.querySelector('#input-name');
  const user = name.filter((e) => e.id === socket.id.substr(1, 16));
  div.innerHTML = `<h3 data-testid="online-user">Olá ${user[0].nickname}</h3>`;
};

const getAllOnline = (object) => {
  // console.log(object);
  const all = document.querySelector('#users');
  const send = object.map((e) => `<li data-testid="online-user">${e.nickname}</li>`).join('');
  all.innerHTML = `${send}`;
};

const renderAll = (object) => {
  const ul = document.querySelector('#messages');
  object.forEach((e) => {
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'message');
    li.innerText = `${e.timestamp} ${e.nickname}: ${e.text}`;
    ul.appendChild(li);
    window.scrollTo(0, document.querySelector('#div-message').scrollHeight);
  });
  const li = document.createElement('li');
  li.innerText = `${socket.id.substr(1, 16)} entrou na sala!`;
  ul.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
socket.on('serverMessage', (object) => createMessage(object));
socket.on('userServer', ({ users }) => getAllOnline(users));
socket.on('userServer', (name) => inputName(name.users));
socket.on('serverAllMessages', (object) => renderAll(object.message));