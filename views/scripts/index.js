const socket = window.io();

window.onload = () => {
  socket.emit('nickname', { id: socket.id });
};

const sendMessageForm = document.querySelector('#send-message-form');
const saveNicknameForm = document.querySelector('#save-nickname-form');
let actualNickname = '';

sendMessageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const messageInput = document.querySelector('#client-message');
  socket.emit('message', { chatMessage: messageInput.value, nickname: actualNickname });
  messageInput.value = '';
});

saveNicknameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nicknameInput = document.querySelector('#nickname');
  socket.emit('nickname', { id: socket.id, nickname: nicknameInput.value });
  nicknameInput.value = '';
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.dataset.testid = 'message';
  messagesUl.appendChild(li);
};

const createNickname = ({ id = socket.id, nickname }) => {
  const nicknameUl = document.querySelector('#nicknames');
  const nicknameLi = document.createElement('li');
  nicknameLi.innerText = nickname;
  nicknameLi.dataset.testid = 'online-user';
  nicknameLi.dataset.id = id;
  nicknameUl.appendChild(nicknameLi);
  actualNickname = nickname;
};

const updateNickname = ({ id, nickname }) => {
  const nicknameLi = document.querySelector(
    `li[data-testid="online-user"][data-id="${id}"]`,
  );
  console.log(`li[data-testid="online-user"][data-id="${id}"]`);
  if (!nicknameLi) return createNickname({ id, nickname });
  nicknameLi.innerText = nickname;
  actualNickname = nickname;
};

socket.on('message', (message) => createMessage(message));
socket.on('nickname', ({ id, nickname }) => updateNickname({ id, nickname }));
