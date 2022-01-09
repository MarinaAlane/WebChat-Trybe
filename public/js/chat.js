const socket = window.io();

let nickname;
let chatMessage = '';

const TEST_ID = 'data-testid';

const userNameElement = document.querySelector('#username');
const onlineUsersScreen = document.querySelector('#onlineUsers');
const nicknameForm = document.querySelector('#formUserNickname');
const screen = document.querySelector('#screenMessage');

const changeUserName = (newUserName) => {
  nickname = newUserName;
  userNameElement.innerText = newUserName;
};

nicknameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.target[0];
  nickname = input.value;
  input.value = '';
  userNameElement.innerText = nickname;
  socket.emit('changeNickname', nickname);
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
  li.setAttribute(TEST_ID, 'message');
  li.innerText = message;
  screen.appendChild(li);
};

const renderOnlineUsers = (users) => {
  onlineUsersScreen.innerHTML = '';
  console.log('USERS', users);
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user;
    li.setAttribute(TEST_ID, 'online-user');
    onlineUsersScreen.appendChild(li);
  });
};

const orderOnlineUsersList = (usersOnline) => {
  const onlineUsers = [];
  const lastUserInArray = usersOnline[usersOnline.length - 1];
  console.log('usersOnline', usersOnline, lastUserInArray);

  // [X] 4º - Para o cliente que acabou de se conectar, seu nickname deve ser colocado no começo da lista;
  onlineUsers.push(lastUserInArray);

  const onlineUsersWithCurrentUserFirst = usersOnline.slice(0, usersOnline.length - 1);
  onlineUsersWithCurrentUserFirst.forEach((user) => onlineUsers.push(user));
  renderOnlineUsers(onlineUsers);
};

socket.on('message', (message) => createMessage(message));

socket.on('userConnected', (usersOnline) => {
// [X] 2º - Remover deste escopo a função de setar o nome do usuário;
  renderOnlineUsers(usersOnline);
});

socket.on('setUserId', ({ userNickname, usersOnline }) => {
  /*
    [X] 3º - No changeUserName re-renderizar os users na ordem:
  */
//  nickname = userNickname;
changeUserName(userNickname);
orderOnlineUsersList(usersOnline);
});

socket.on('changeUsersName', (usersOnline) => {
  orderOnlineUsersList(usersOnline);
});

socket.on('renderMessageHistory', (messageHistory) => {
    messageHistory.forEach((message) => createMessage(message));
});

socket.on('userDisconnected', (usersOnline) => renderOnlineUsers(usersOnline));

  // Essa eu n lembrava:
  window.onbeforeunload = (_e) => {
    socket.disconnect();
  };