const socket = window.io();

const form = document.getElementById('messageForm');
const inputMessage = document.getElementById('messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    nickname: socket.id,
    chatMessage: inputMessage.value,
  });
  inputMessage.value = '';
});

const createMessage = (message) => {
  const messagesUl = document.getElementById('messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

// req 02
socket.on('sendNickName', (nickname) => {
  const usersUl = document.getElementById('users'); // lista users
  const li = document.createElement('li'); // cria elemento lista 
  li.textContent = nickname;
  li.setAttribute('data-testid', 'online-user');
  usersUl.appendChild(li);
});

socket.on('message', (message) => createMessage(message));