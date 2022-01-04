const socket = window.io();

const saveButton = document.querySelector('#saveButton');
const sendButton = document.querySelector('#sendButton');

sendButton.addEventListener('click', () => {
  const chatMessage = document.querySelector('#chatMessage').value;
  const nickname = sessionStorage.getItem('nickName');

  socket.emit('message', {
    chatMessage,
    nickname,
  });
  return false;
});

saveButton.addEventListener('click', () => {
  const nickName = document.querySelector('#nickName').value;
  sessionStorage.setItem('nickName', nickName);
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (mensagem) => createMessage(mensagem));