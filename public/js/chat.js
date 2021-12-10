const socket = window.io();

const msgForm = document.querySelector('#msg-form');
const msgInput = document.querySelector('#msg-input');
const nickForm = document.querySelector('#nick-form');
const nickInput = document.querySelector('#nickname');

// evento do input mensagem
msgForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (msgInput.value) {
    socket.emit('message', { chatMessage: msgInput.value, nickname: nickInput.value });
    // console.log(msgInput.value, 'CHATMESSAGE');
    // console.log(nickInput.value, 'NICKNAME');
    msgInput.value = '';
    nickInput.value = '';
  }
  return false;
});

const createMessage = (message) => {
  const messages = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
};

// evento do nickname
nickForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (nickInput.value) {
    const nicknameInput = nickInput.value;
    socket.emit('saveNickname', nicknameInput);
  }
  return false;  
});

const createUser = (newNickname) => {
  const onlineUser = document.querySelector('#user-online');
  const li = document.createElement('li');
  li.innerText = newNickname;
  li.setAttribute('data-testid', 'online-user');
  onlineUser.appendChild(li);
};

// evento será disparado pelo message
socket.on('message', (message) => createMessage(message));
socket.on('userLogged', (nickname) => createUser(nickname));
