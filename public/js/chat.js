const socket = window.io();

const formMessage = document.getElementById('form-messages');
const inputMessage = document.getElementById('messageInput');

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const newMessage = {
    chatMessage: inputMessage.value,
    nickname: 'TesteNickName',
  };
  socket.emit('message', newMessage);
  inputMessage.value = ''; 
});

const createMessage = (message) => {
  console.log(message);
  const messagesUl = document.getElementById('messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
