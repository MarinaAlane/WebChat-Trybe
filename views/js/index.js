const socket = window.io();

function generateNickname() {
  let nick = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 16; i += 1) {
    nick += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return nick;
}

let nickname = generateNickname();
let currentNickname = nickname;
const online = 'online-user';

const users = document.getElementById('users');
const userForm = document.getElementById('users-form');
const userInput = document.getElementById('user-input');

window.onbeforeunload = () => {
  socket.disconnect('this');
};

window.onload = () => {
  const user = document.createElement('li');
  user.textContent = nickname;
  user.dataset.testid = online;
  if (users.firstChild) {
    users.insertBefore(user, users.firstChild);
  } else {
    users.appendChild(user);
  }
  socket.emit('createUser', { currentNickname });
};

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (userInput.value) {
    currentNickname = nickname;
    nickname = userInput.value;
    const li = document.createElement('li');
    li.textContent = userInput.value;
    li.dataset.testid = online;
    users.removeChild(users.firstChild);
    users.insertBefore(li, users.firstChild);
    socket.emit('changeNickname', { currentNickname, nickname });
    userInput.value = '';
  }
});

const messages = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (messageInput.value) {
    socket.emit('message', { chatMessage: messageInput.value, nickname });
    messageInput.value = '';
  }
});

socket.on('message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  li.dataset.testid = 'message';
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('changeNickname', (usernames) => {
  const user = document.createElement('li');
  user.textContent = nickname;
  user.dataset.testid = online;
  users.textContent = '';
  users.appendChild(user);

  usernames.forEach((element) => {
    const li = document.createElement('li');
    li.textContent = element;
    li.dataset.testid = online;
    if (element !== nickname) users.appendChild(li);
  });
}); 