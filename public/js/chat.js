const socket = window.io();

const form = document.querySelector('#message-form');
const nicknameForm = document.querySelector('#nickname-form');
const newnickname = document.querySelector('#nicknamebox');

const inputMessage = document.querySelector('#messageInput');
const usersList = document.querySelector('#users');

const makeNickName = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let index = 0; index < 16; index += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  sessionStorage.setItem('nickname', text);

  const li = document.createElement('li');
  li.innerText = text;
  li.setAttribute('data-testid', 'online-user');
  usersList.appendChild(li);

  return text;
};

window.onload = () => {
  makeNickName();
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

  console.log(newNickname);

  sessionStorage.setItem('nickname', newNickname);
  newnickname.value = '';
  return false;
});

const createMessage = (userMessage) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = userMessage;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li); 
};

socket.on('message', (userMessage) => createMessage(userMessage));
