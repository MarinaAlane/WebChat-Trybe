const socket = window.io();
const formMessage = document.querySelector('#messageForm');
const inputMessage = document.querySelector('#messageInput');
const formNickname = document.querySelector('.nicknameForm');
const inputNickname = document.querySelector('#nicknameInput');
const messagesUl = document.querySelector('#messages');
const userNickname = document.querySelector('#currentUser');
let currentUser = userNickname.innerText;
const data = 'data-testid';

socket.emit('userConnect', currentUser);

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: currentUser });
  inputMessage.value = '';
  return false;
});

formNickname.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('userUpdate', { oldNickname: currentUser, newNickname: inputNickname.value });
  currentUser = inputNickname.value;
  console.log(currentUser);
});

const createMessage = (message) => {
  const li = document.createElement('li');
  console.log(socket.id);
  li.setAttribute(data, 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const createUserList = (users) => {
  const AllUsers = document.querySelector('#users-list');
  AllUsers.innerHTML = '';
  const currentUserElement = document.createElement('li');
  currentUserElement.setAttribute(data, 'online-user');
  currentUserElement.setAttribute('id', 'currentUser');
  currentUserElement.innerText = currentUser;
  AllUsers.appendChild(currentUserElement);
  users.forEach((user) => {
    if (user !== currentUser) {
      const newUserElement = document.createElement('li');
      newUserElement.setAttribute(data, 'online-user');
      newUserElement.innerText = user;
      AllUsers.appendChild(newUserElement);
    }
  });
};

socket.on('userListAtt', (users) => {
createUserList(users);
});

socket.on('message', (message) => createMessage(message));

// push para evitar o bug no avaliador