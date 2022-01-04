function randomNickNameGenerator() {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let randomNick = '';

  for (let length = 0; randomNick.length < 16; length += 1) {
    const randomNumber = Math.floor(Math.random() * 26);
    if (randomNick.length === 0) {
      randomNick += characters[randomNumber].toLocaleUpperCase();
    }
    randomNick += characters[randomNumber];
  }

  return randomNick;
}

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
  socket.emit('newUser', nickName);
});

const createUser = (user) => {
  const usersUl = document.querySelector('#users');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = user;
  usersUl.appendChild(li);
};

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (mensagem) => createMessage(mensagem));
socket.on('newUser', (user) => createUser(user));

window.onload = () => {
  const nickName = randomNickNameGenerator();
  sessionStorage.setItem('nickName', nickName);
  socket.emit('newUser', nickName);
};