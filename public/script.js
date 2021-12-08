/* eslint-disable max-lines-per-function */
const socket = window.io();

const messageInput = document.querySelector('#messageInput');
const chatList = document.querySelector('#chatList');
const nameButton = document.querySelector('#nameButton');
const nameInput = document.querySelector('#nameInput');

const setId = () => {
  const randomString = crypto.getRandomValues(new Uint8Array(16));
  const id = randomString
    .reduce((acc, cur) => acc + cur.toString(16), '')
    .substring(0, 16);
  return id;
};

const getUser = () => {
  const user = sessionStorage.getItem('nickname');
  if (user) {
    return user;
  }
  sessionStorage.setItem('nickname', setId());
  return sessionStorage.getItem('nickname');
};

socket.on('newUser', () => {
  socket.emit('login', getUser());
});

const sendMessage = () => {
  const chatMessage = messageInput.value;
  socket.emit('message', { chatMessage, nickname: getUser() });
  messageInput.value = '';
};

messageInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) return sendMessage();
});

const addMessageToChat = (message) => {
  const li = document.createElement('li');
  li.classList.add('clearfix');
  const span = document.createElement('span');
 
  span.innerText = message;
  span.setAttribute('data-testid', 'message');
  li.appendChild(span);
  chatList.appendChild(li);
};

socket.on('message', (data) => addMessageToChat(data));

const setName = () => {
  const userName = document.querySelector('#userName');
  const name = nameInput.value;
  sessionStorage.setItem('nickname', name);
  socket.emit('setName', name);
  userName.innerText = name;
  nameInput.value = '';
};

const newUserAnnouncement = (nickname) => {
  const li = document.createElement('li');
  li.classList.add('clearfix');
  const div2 = document.createElement('div');
  div2.classList.add('message', 'other-message');
  const span = document.createElement('span');
  span.setAttribute('data-testid', 'online-user');
  span.innerText = nickname;
  const span2 = document.createElement('span');
  span2.innerText = ' has joined the chat';
  div2.appendChild(span);
  div2.appendChild(span2);
  li.appendChild(div2);
  chatList.appendChild(li);
};

socket.on('serverAnnouncement', (data) => {
  console.log(data);
  newUserAnnouncement(data);
});

nameButton.addEventListener('click', setName);
