const socket = window.io();

const form = document.querySelector('#form');
const buttonNick = document.querySelector('#nickname-button');

form.addEventListener('submit', (e) => {
  const input = document.querySelector('#message-box');
  e.preventDefault();
  if (input.value) {
    socket.emit('message', { nickname: socket.id, chatMessage: input.value });
    input.value = '';
  }
});

const createIl = (text, ul, testId) => {
  const li = document.createElement('li');
  li.innerText = text;
  li.setAttribute('data-testid', testId);
  ul.appendChild(li);
}; 
    
socket.on('message', (message) => {
  const messagesUl = document.querySelector('#messages');
  createIl(message, messagesUl, 'message');
}); 

socket.on('userName', (id, users) => {
  const userUl = document.querySelector('#users');
  userUl.innerHTML = '';
  createIl(id, userUl, 'online-user');

  const newUsers = Object.values(users);
  newUsers.forEach((element) => {
     if (element !== id) createIl(element, userUl, 'online-user');
    });
});

buttonNick.addEventListener('click', () => {
  const inputNickName = document.querySelector('#nickname-box');
  socket.emit('newNick', inputNickName.value);
});
