const socket = window.io();
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  const messageInput = document.querySelector('#messageInput');
  const nicknameInput = document.querySelector('#nickNameInput');
  e.preventDefault();

  const message = messageInput.value;
  messageInput.value = '';
  const nickname = nicknameInput.value;

  socket.emit('message', { chatMessage: message, nickname });
});
  
  const createMessage = (chatMessage) => {
    const messagesUl = document.querySelector('#messages');
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'message');
    li.innerText = chatMessage;
    messagesUl.appendChild(li);
  };
  
  socket.on('message', (chatMessage) => createMessage(chatMessage)); 