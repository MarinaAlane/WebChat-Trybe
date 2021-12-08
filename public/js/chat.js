const socket = window.io();

// const { getByNickName } = require('../../controllers');

const form = document.querySelector('#message-form');
const nicknameForm = document.querySelector('#nickname-form');
const newnickname = document.querySelector('#nicknamebox');
const dataTest = 'data-testid';

const inputMessage = document.querySelector('#messageInput');
const usersList = document.querySelector('#users');

const makeNickName = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let index = 0; index < 16; index += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  sessionStorage.setItem('nickname', text);

  return text;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nickname = sessionStorage.getItem('nickname');  
  
  const chatMessage = inputMessage.value;   

  socket.emit('message', { chatMessage, nickname });
  inputMessage.value = '';
  return false;
});

nicknameForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newNickname = newnickname.value;
  const oldNickname = sessionStorage.getItem('nickname');

  sessionStorage.setItem('nickname', newNickname);

  socket.emit('new-user', { user: newNickname, userOld: oldNickname });

  newnickname.value = '';
  return false;
});

const createMessage = (userMessage) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = userMessage;
  li.setAttribute(dataTest, 'message');
  messagesUl.appendChild(li); 
};

const historicMessage = (userMessage) => {
  const messagesUl = document.querySelector('#historic-messages');
  const li = document.createElement('li');
  li.innerText = userMessage;
  li.setAttribute(dataTest, 'message');
  messagesUl.appendChild(li); 
};

socket.on('message', (userMessage) => createMessage(userMessage));

socket.on('update-nicknames', (arrayUsers) => {
  usersList.innerHTML = '';
  const arr = [];

  const usernickname = sessionStorage.getItem('nickname');

  const fisrtLi = document.createElement('li');
  fisrtLi.innerText = usernickname;
  fisrtLi.setAttribute(dataTest, 'online-user');

  arr.push(fisrtLi);
  
  arrayUsers.forEach((element) => {
    if (element.user === usernickname) return;
    const li = document.createElement('li');
    li.innerText = element.user;
    li.setAttribute(dataTest, 'online-user');
    arr.push(li);
  });
  arr.forEach((elements) => usersList.appendChild(elements));
});

window.onload = () => {
  const nickUser = makeNickName();
  socket.emit('new-user', { user: nickUser, userOld: null });

  socket.on('historic-messages', (historicMessages) => {
    historicMessages.forEach(({ nickname, message, time }) => {
      const userMessage = `${time} ${nickname} ${message}`;
      historicMessage(userMessage);
    });
});
};