const formMsg = document.querySelector('#message');
const formNick = document.querySelector('#nick');
const nick = document.querySelector('#nickName');
const nickBox = document.querySelector('#nick-name-box');
const msg = document.querySelector('#messageInput');
const usersList = document.querySelector('#users');
const messagesList = document.querySelector('#messages');

const getRandomNumb = () => {
  let result = Math.floor(Math.random() * 75) + 48;
  if (
      (result > 57 && result < 65)
      || (result > 90 && result < 97)
  ) result = getRandomNumb();

  return result;
};

function getRandomNick() {
  const arrOfRandNumb = Array.from({ length: 16 }, getRandomNumb);
  const newNick = String.fromCharCode(...arrOfRandNumb);
  
  return newNick;
}

function setNick(name) {
  sessionStorage.setItem('nick', name);
  nick.innerText = name;
}

if (!sessionStorage.nick) setNick(getRandomNick());
else setNick(sessionStorage.nick);

const socket = window.io({
  query: { nick: nick.innerText },
});

formNick.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nickBox.value;
  socket.emit('users', name);
  setNick(name);
});

formMsg.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: msg.value, nickname: nick.innerText });
  msg.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

const createUser = (user) => {
  const usersUl = document.querySelector('#users');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = user;
  usersUl.appendChild(li);
};

const filteruser = (users) => {
  users.forEach(({ id, nick: name }) => {
    if (id !== socket.id) createUser(name);
  });
};

const filterMessages = (messages) => {
  messages.forEach(({ message, nickname, timestamp }) => {
    const mes = `${timestamp} ${nickname}: ${message}`;
    createMessage(mes);
  });
};

socket.on('message', (messages) => {
  while (messagesList.firstElementChild) {
    messagesList.removeChild(messagesList.firstElementChild);
  }
  filterMessages(messages);
});
socket.on('users', (users) => {
  while (usersList.firstElementChild.nextElementSibling) {
    usersList.removeChild(usersList.firstElementChild.nextElementSibling);
  }
  filteruser(users);
});

window.onbeforeunload = (_event) => {
  socket.disconnect();
};