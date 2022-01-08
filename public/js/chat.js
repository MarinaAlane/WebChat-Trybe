const socket = window.io();

const formMessage = document.getElementById('form-messages');
const inputMessage = document.getElementById('messageInput');
const inputNickname = document.getElementById('input-nickname');
const formNickname = document.getElementById('form-user');
const spanNickname = document.querySelector('span');
const listOnlineUsers = document.getElementById('list-online-users');
const setNickname = (nickname) => sessionStorage.setItem('nickname', nickname);
const getNickname = () => sessionStorage.nickname;

const setRandomNickname = (name) => {
  setNickname(name);
  document.querySelector('span').innerHTML = name.substr(0, 16);
};

formNickname.addEventListener('submit', (e) => {
  e.preventDefault();
  const oldUsername = getNickname();
  const newUsername = inputNickname.value;
  setNickname(newUsername);
  spanNickname.innerText = newUsername;
  socket.emit('updateUsername', { oldUsername, newUsername });
  inputNickname.value = ''; 
});

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const newMessage = {
    chatMessage: inputMessage.value,
    nickname: getNickname(),
  };
  socket.emit('message', newMessage);
  inputMessage.value = ''; 
});

const createMessage = (message) => {
  const messagesUl = document.getElementById('chat');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const loadMessages = (history) => {
  history.forEach(({ message, nickname, timestamp }) => {
    const newMessage = `${timestamp} - ${nickname}: ${message}`;
    createMessage(newMessage);
  });
};

const loadHistoryMessagesFromDB = () => {
  const messagesUl = document.getElementById('chat');
  messagesUl.innerHTML = '';
  socket.emit('load');
  socket.on('loadHistory', (history) => loadMessages(history));
};

const createUser = (user) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = user;
  listOnlineUsers.appendChild(li);
};

const verifyLoadUser = (user) => {
  const usersList = listOnlineUsers.children;
  for (let index = 0; index < usersList.length; index += 1) {
    if (usersList[index].innerText === user) return true;
  }
  return false;
};

socket.on('message', (message) => createMessage(message));
socket.on('generateName', (name) => setRandomNickname(name));
socket.on('login', (newUserLogged) => {
  createUser(newUserLogged);
  const user = getNickname();
  socket.emit('login', user);
});
socket.on('attListUsers', (user) => {
  if (!verifyLoadUser(user)) createUser(user);
});

socket.on('dc', (user) => {
  const usersList = listOnlineUsers.children;
  for (let index = 0; index < usersList.length; index += 1) {
    if (usersList[index].innerText === user) {
      usersList[index].remove();
    }
  }
});

socket.on('updateListUsernames', ({ oldUsername, newUsername }) => {
  const usersList = listOnlineUsers.children;
  for (let index = 0; index < usersList.length; index += 1) {
    if (usersList[index].innerText === oldUsername) {
      usersList[index].innerHTML = newUsername;
      break;
    }
  }
});

window.onload = () => {
  loadHistoryMessagesFromDB();
};
