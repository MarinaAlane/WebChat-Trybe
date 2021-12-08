const socket = window.io();

const form = document.querySelector('.messageBox');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  const nickname = document.querySelector('#nickname').textContent;
  socket.emit('message', { chatMessage, nickname });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

const saveNickname = () => {
    const nickname = document.querySelector('#nicknameInput').value;
    const nicknameSpan = document.querySelector('#nickname');
    nicknameSpan.textContent = nickname;
  };

  const nicknameGenerator = () => {
    let finalRandomNickname = '';
    for (let i = 0; i < 16; i += 1) {
      finalRandomNickname += Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 1);
    }
    return `${finalRandomNickname}`;
  };

  const defineNicknameOnLoad = () => {
    const nickname = nicknameGenerator();
    const nicknameSpan = document.querySelector('#nickname');
    nicknameSpan.textContent = nickname;
  };

  socket.on('message', (message) => createMessage(message));

  module.exports = {
    socket,
    createMessage,
    saveNickname,
    defineNicknameOnLoad,
  };