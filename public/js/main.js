const socket = window.io();
const btnSendMessage = document.getElementById('send');
const btnChangeNickname = document.getElementById('change-nickname');
const randomIdH3 = document.getElementById('random-id');

function randomNickname() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 16; i += 1) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

randomIdH3.innerText = randomNickname();

btnSendMessage.addEventListener('click', () => {
  const messageInput = document.getElementById('message');
  const nickname = document.getElementById('nickname').value;
  const message = messageInput.value;
  messageInput.value = '';

  const data = {
    chatMessage: message,
    nickname,
  };

  socket.emit('message', data);
});

btnChangeNickname.addEventListener('click', () => {
  const nickname = document.getElementById('nickname').value;
  randomIdH3.innerText = nickname;
  nickname.value = '';
});

socket.on('message', (data) => {
  const messages = document.getElementById('messages-list');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = data;
  messages.appendChild(li);
});