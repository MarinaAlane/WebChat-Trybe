const socket = window.io('http://localhost:3000');

const online = 'online-user';

const usersUl = document.getElementById('users');
const messagesUl = document.getElementById('messages');

const btnSave = document.getElementById('btnSave');

const messageInput = document.getElementById('message');
const btnMessage = document.getElementById('btnMessage');

btnSave.addEventListener('click', (e) => {
  const nickNameInput = document.getElementById('nickname');
  const usersList = document.querySelector('.online-user');
  e.preventDefault();
  
  usersList.innerText = nickNameInput.value;
  socket.emit('changeFirstId', nickNameInput.value, sessionStorage.nickname);
  sessionStorage.setItem('nickname', nickNameInput.value);

  nickNameInput.value = '';
});

btnMessage.addEventListener('click', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('message', { nickname, chatMessage: messageInput.value });
  messageInput.value = '';
});

// const createMessage = (greeting) => {
//   const createLi = document.createElement('li');
//   createLi.innerText = greeting;
//   messagesUl.appendChild(createLi);
//   return false;
// };

const createUser = (id) => {
  const createLi = document.createElement('li');
  createLi.innerText = id;
  const dataTest = 'data-testid';
  createLi.setAttribute(dataTest, online);
  createLi.setAttribute('class', online);
  usersUl.appendChild(createLi);
  return false;
};

const createChatMessage = (message) => {
  const createLi = document.createElement('li');
  createLi.innerText = message;
  const dataTest = 'data-testid';
  createLi.setAttribute(dataTest, 'message');
  messagesUl.appendChild(createLi);
  return false;
};

socket.on('firstId', (usersArr) => {
  // Função feita com a ajuda de Tales Coelho.
  usersUl.innerHTML = '';
  const id = usersArr[usersArr.length - 1];
  sessionStorage.setItem('nickname', id);
  createUser(id);
  for (let i = 0; i < usersArr.length - 1; i += 1) {
    createUser(usersArr[i]);
  }
});

socket.on('online', (id) => createUser(id));
socket.on('changeId', (id, oldId) => {
  const usersList = document.querySelectorAll('.online-user');
  usersList.forEach((e) => {
    if (e.innerText === oldId) {
      e.innerText = id;
    }
  });
});

// socket.on('greeting', (message) => createMessage(message));
socket.on('message', (message) => createChatMessage(message));
socket.on('offline', (nick) => { 
  createChatMessage(nick); 
});
