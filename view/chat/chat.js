const socket = window.io();

const formNickname = document.querySelector('.nicknameForm');
const nickname = document.querySelector('.nickname');
const sendMessageForm = document.querySelector('.sendMessageForm');
const messageInput = document.querySelector('.messageInput');
const chatMessages = document.querySelector('.messages');
const userNickname = document.querySelector('.userNickname');

formNickname.addEventListener('submit', (e) => {
  e.preventDefault();

  userNickname.innerText = nickname.value;

  nickname.value = '';
});

const showNickname = (id) => {
  userNickname.innerText = id;
};

socket.on('generateNickname', (id) => showNickname(id));

sendMessageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('message', {
    chatMessage: messageInput.value,
    nickname: userNickname.textContent,
  });

  messageInput.value = '';
});

const setMessage = (formatedMessage) => {
  const li = document.createElement('li');

  li.innerText = formatedMessage;
  li.setAttribute('data-testid', 'message');

  chatMessages.appendChild(li);
};

socket.on('message', (message) => setMessage(message));
