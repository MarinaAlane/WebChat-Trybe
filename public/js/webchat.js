const socket = window.io();

const makeId = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Nickname

let nickname = sessionStorage.getItem('nick') || makeId(16);
sessionStorage.setItem('nick', nickname);

socket.emit('newClient', { nickname });

const nickForm = document.querySelector('#nicknameForm');
const nickInput = document.querySelector('#nicknameInput');

nickForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('changeNick', {
    oldNick: nickname,
    nickname: nickInput.value,
  });
  nickname = nickInput.value;
  sessionStorage.setItem('nick', nickname);

  return false;
});

const createUserLi = (nick) => {
  const userPane = document.querySelector('#usersPane');

  const newUser = document.createElement('li');
  newUser.setAttribute('data-testid', 'online-user');
  newUser.innerText = nick;

  userPane.appendChild(newUser);
};

const editUser = ({ oldNick, nickname: newNickname }) => {
  const userLis = document.querySelectorAll('#usersPane > li');
  for (let i = 0; i < userLis.length; i += 1) {
    if (userLis[i].innerText === oldNick) {
      userLis[i].innerText = newNickname;
      break;
    }
  }
};
socket.on('newConnection', (users) => {
  const userPane = document.querySelector('#usersPane');
  userPane.innerHTML = '';
  const { [socket.id]: myUser, ...usersWithoutMe } = users;
  createUserLi(myUser);
  Object.values(usersWithoutMe).forEach((user) => createUserLi(user));
});
socket.on('newNick', editUser);

// Message
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#messageInput');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    nickname,
    chatMessage: messageInput.value,
  });
  messageInput.value = '';

  return false;
});

const createMessage = (chatMessage) => {
  const msgPane = document.querySelector('#messagesPane');

  const newMessage = document.createElement('li');
  newMessage.innerText = chatMessage;
  newMessage.setAttribute('data-testid', 'message');

  msgPane.appendChild(newMessage);
};

socket.on('message', createMessage);
