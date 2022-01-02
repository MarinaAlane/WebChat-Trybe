const socket = window.io('localhost:3000');

let nickname = 'xxxx';
let chatMessage = '';

const TEST_ID = 'data-testid';

const userNameElement = document.querySelector('#username');

const changeUserName = (newUserName) => {
  userNameElement.innerText = newUserName;
};

const onlineUsersScreen = document.querySelector('#onlineUsers');
const nicknameForm = document.querySelector('#formUserNickname');

nicknameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.target[0];
  nickname = input.value;
  input.value = '';
  userNameElement.innerText = nickname;
  return false;
});

const messageForm = document.querySelector('#userFormMessage');
messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.target[0];
  chatMessage = input.value;
  socket.emit('message', { nickname, chatMessage });
  input.value = '';
  return false;
});

const createMessage = (message) => {
  const li = document.createElement('li');
  const screen = document.querySelector('#screenMessage');
  li.setAttribute(TEST_ID, 'message');
  li.innerText = message;
  screen.appendChild(li);
};

const renderOnlineUsers = (users) => {
  console.log('AQUI OS USERS:', users);

  onlineUsersScreen.innerText = '';
  
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user;
    li.setAttribute(TEST_ID, 'online-user');
    onlineUsersScreen.appendChild(li);
  });
};

socket.on('message', (message) => createMessage(message));

socket.on('userConnected', (serverInfos) => {
// [ ] 2º - Remover deste escopo a função de setar o nome do usuário;
  // changeUserName(serverInfos.userNickname);

  console.log('server infos:', serverInfos);
  renderOnlineUsers(serverInfos.usersOnline);
});

socket.on('setUserId', (userNickName, _onlineUsers) => {
  nickname = userNickName;
});
