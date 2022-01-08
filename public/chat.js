const socket = window.io();

const form = document.querySelector('#form');
const input = document.querySelector('#message-box');
const dataTestId = 'data-testid';
const onlineUser = document.getElementById('online-user');
const saveBtn = document.getElementById('save-btn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('message', { nickname: socket.id, chatMessage: input.value });
    input.value = '';
  }
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message'); messagesUl.appendChild(li);
}; 
    
socket.on('message', (message) => createMessage(message)); 

/* form.addEventListener('submit', (e) => { e.preventDefault(); socket.emit('message', { nickname: socket.id, chatMessage: inputMessage.value }); inputMessage.value = ''; // return false; }); */ 

socket.on('connection', (id) => {
  const i = id.slice(0, -4);
  console.log(i);
});