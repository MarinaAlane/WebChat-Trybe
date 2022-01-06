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
const randomNickName = randomNickNameGenerator();

sendButton.addEventListener('click', () => {
  const chatMessage = document.querySelector('#chatMessage').value;
  const nickname = sessionStorage.getItem('nickName');

  socket.emit('message', {
    chatMessage,
    nickname,
  });
  return false;
});

const updateUser = ({ nickName, id }) => {
  const nameElement = document.getElementById(id);

  nameElement.innerText = nickName;
};

saveButton.addEventListener('click', () => {
  const nickName = document.querySelector('#nickName').value;
  const { id } = socket;
  
  sessionStorage.setItem('nickName', nickName);
  socket.emit('updateUser', { nickName, id });
});

const createUser = ({ user, id }) => {
  const usersUl = document.querySelector('#users');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.setAttribute('id', id);
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
socket.on('newUser', (newUser) => createUser(newUser));

socket.on('userList', (users) => {
  const usersUl = document.querySelector('#users');
  while (usersUl.hasChildNodes()) {
    usersUl.removeChild(usersUl.lastChild);
}
  // const index = users.indexOf(randomNickName);
  let arrAux = users;
  let firstUser = {};
  const userName = sessionStorage.getItem('nickName');
  arrAux.forEach((elem) => {
    if (elem.user === userName) firstUser = elem;
  });
  arrAux = arrAux.filter((el) => userName !== el.user);
  arrAux = [firstUser, ...arrAux];
  arrAux.forEach((element) => {
    createUser(element);
  });
});
socket.on('updateUser', (userData) => updateUser(userData));

socket.on('disconnected', (id) => {
  const userElement = document.getElementById(id);
  userElement.remove();
});

window.onload = () => {
  sessionStorage.setItem('nickName', randomNickName);
  socket.emit('newUser', randomNickName);
  socket.emit('userList');
};
