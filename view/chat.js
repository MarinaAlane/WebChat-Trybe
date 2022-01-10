const socket = window.io();

const formNickname = document.querySelector('.nicknameForm');
const nickname = document.querySelector('.nickname');
const sendMessageForm = document.querySelector('.sendMessageForm');
const messageInput = document.querySelector('.messageInput');
const chatMessages = document.querySelector('.messages');
const userNick = document.querySelector('.onlineUser');
const onlineUsers = document.querySelector('.onlineUsers-list');

let currentUser = userNick.innerText;

socket.emit('connectUser', currentUser);

const testid = 'data-testid';

formNickname.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('updateUser', {
    oldNickname: currentUser,
    newNickname: nickname.value,
  });

  currentUser = nickname.value;
  nickname.value = '';
});

const createUserLi = (userNickname) => {
  const li = document.createElement('li');

  li.innerText = userNickname;
  li.setAttribute(testid, 'online-user');

  return li;
};

const createUserList = (usersArr) => {
  onlineUsers.innerHTML = '';

  const localUserLi = createUserLi(currentUser);
  onlineUsers.appendChild(localUserLi);

  usersArr.forEach((user) => {
    if (user !== currentUser) {
      const remoteUser = createUserLi(user);
      onlineUsers.appendChild(remoteUser);
    }
  });
};

socket.on('updateOnlineUsers', (users) => {
  createUserList(users);
});

sendMessageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('message', {
    chatMessage: messageInput.value,
    nickname: currentUser,
  });

  messageInput.value = '';
});

const setMessage = (formatedMessage) => {
  const li = document.createElement('li');

  li.innerText = formatedMessage;
  li.setAttribute('data-testid', 'message');

  chatMessages.appendChild(li);
};

socket.on('message', (message) => setMessage(message));
