// @ts-nocheck
/* eslint-disable max-lines-per-function */
const socket = window.io();
const dataTestid = 'data-testid';
const messageInput = document.querySelector('#messageInput');
const chatList = document.querySelector('#chatList');
const nameButton = document.querySelector('#nameButton');
const nameInput = document.querySelector('#nameInput');
const chatUsers = document.querySelector('#chatUsers');
const userName = document.querySelector('#userName');
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

userName.innerText = getUser();

socket.emit('login', getUser());

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
  span.setAttribute(dataTestid, 'message');
  li.appendChild(span);
  chatList.appendChild(li);
};

socket.on('message', (data) => addMessageToChat(data));

const setName = () => {
  const oldName = getUser();
  const newName = nameInput.value;
  sessionStorage.setItem('nickname', newName);
  socket.emit('setName', { oldName, newName });
  const user = chatUsers.querySelector('[data-testid="online-user"]');

  user.innerText = newName;
  userName.innerText = newName;
  nameInput.value = '';
};

const newUserAnnouncement = (nickname) => {
  const li = document.createElement('li');
  li.classList.add('clearfix');
  const div2 = document.createElement('div');
  div2.classList.add('message', 'other-message');
  const span = document.createElement('span');
  // span.setAttribute(dataTestid, 'online-user');
  span.innerText = nickname;
  const span2 = document.createElement('span');
  span2.innerText = ' has joined the chat';
  div2.appendChild(span);
  div2.appendChild(span2);
  li.appendChild(div2);
  chatList.appendChild(li);
  // chatList.insertBefore(li, chatUsers.childNodes[0]);
};

nameButton.addEventListener('click', setName);

const refreshUserList = ({ nickname }) => {
  const randomNumber = Math.floor(Math.random() * 8) + 1;
  const src = `https://bootdey.com/img/Content/avatar/avatar${randomNumber}.png`;
  const li = document.createElement('li');
  li.classList.add('clearfix');
  const img = document.createElement('img');
  img.setAttribute('src', src);
  img.setAttribute('alt', 'avatar');
  const div = document.createElement('div');
  div.classList.add('about');
  const name = document.createElement('div');
  name.classList.add('name');
  name.setAttribute(dataTestid, 'online-user');
  const status = document.createElement('div');
  img.classList.add('avatar');
  name.innerText = nickname;
  status.classList.add('status');
  const i = document.createElement('i');
  i.classList.add('fa', 'fa-circle', 'online');
  status.appendChild(i);
  const span = document.createElement('span');
  span.innerText = 'online';
  status.appendChild(span);
  div.appendChild(name);
  div.appendChild(status);
  li.appendChild(img);
  li.appendChild(div);
  if (nickname === getUser()) {
    return chatUsers.insertBefore(li, chatUsers.childNodes[0]);
  }
  return chatUsers.appendChild(li);
};

socket.on('newUserAnnouncement', (data) => newUserAnnouncement(data));

socket.on('connectedUsers', (data) => {
  chatUsers.innerHTML = '';
  data.forEach((user) => {
    refreshUserList(user);
  });
});
