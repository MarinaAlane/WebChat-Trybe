const socket = window.io();

const formMessage = document.querySelector('#form-messages');
const inputMessage = document.querySelector('#message-input');
const formName = document.querySelector('#form-nickname');
const inputName = document.querySelector('nickname-input');
const messagesUl = document.querySelector('#messages');
const userList = document.querySelector('#online-users');

let userListClient = [];

const setNicknameIntoSessionStorage = (nickname) => sessionStorage.setItem('nickname', nickname);
const getNicknameFromSessionStorage = () => sessionStorage.nickname || (socket.id).substr(4);
const setInitialNicknameIntoSessionStorage = () => {
  if (typeof socket.id === 'string') {
    const nicknameToSet = (socket.id).substr(4);
    setNicknameIntoSessionStorage(nicknameToSet);
  }
};

const createServerMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const createChatMessage = (chatMessage) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = chatMessage;
  messagesUl.appendChild(li);
};

const createUserLi = (nickname) => {
  const li = document.createElement('li');
    li.setAttribute('data-testid', 'online-user');
    li.innerText = nickname;
    userList.appendChild(li);
};

const renderUsersList = () => {
  userList.innerHTML = '';
  const clientNickname = getNicknameFromSessionStorage();
  createUserLi(clientNickname);
  userListClient.forEach((nickname) => {
    if (clientNickname !== nickname) {
      createUserLi(nickname);
    }
  });
};

const sendUsersListToServer = () => {
  socket.emit('usersListFromClient', userListClient);
};

const addNewUserToList = (newUser) => {
  userListClient.push(newUser);
  renderUsersList();
  sendUsersListToServer();
};

const updateListWithAllUsers = (usersListFromServer) => {
  if (usersListFromServer.length > userListClient.length) {
    userListClient = usersListFromServer;
    renderUsersList();
  }
};

const updateNicknameAndSendToServer = () => {
  const previusNickname = getNicknameFromSessionStorage();
  const newNickname = inputName.value;
  const nicknameIndex = userListClient.indexOf(previusNickname);
  console.log(userListClient);
  console.log(previusNickname);
  userListClient[nicknameIndex] = newNickname;
  setNicknameIntoSessionStorage(newNickname);
  socket.emit('updateNickname', newNickname);
  inputName.value = '';
  renderUsersList();
};

const updateNicknameFromServer = ({ previusNickname, newNickname }) => {
  const nicknameIndex = userListClient.indexOf(previusNickname);
  userListClient[nicknameIndex] = newNickname;
  renderUsersList();
};

const removeNicknameFromServer = (nickname) => {
  const nicknameIndex = userListClient.indexOf(nickname);
  userListClient.splice(nicknameIndex, 1);
  renderUsersList();
};

const requestMessagesToLoad = () => {
  socket.emit('getMessagesFromDB');
};

const loadDBMessages = (messages) => {
  messages.forEach((document) => {
    const { message, nickname, timestamp } = document;
    const formatedMessage = `${timestamp} - ${nickname}: ${message}`;
    createChatMessage(formatedMessage);
  });
};

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = getNicknameFromSessionStorage();
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
  return null;
});

formName.addEventListener('submit', (e) => {
  e.preventDefault();
  updateNicknameAndSendToServer();
  return null;
});

socket.on('serverMessage', (messageData) => createServerMessage(messageData));
socket.on('message', (messageData) => createChatMessage(messageData));
socket.on('newUser', (usersListFromServer) => addNewUserToList(usersListFromServer));
socket.on('listWithAllUsers', (usersListFromServer) => updateListWithAllUsers(usersListFromServer));
socket.on('updateNickname', (nicknameToUpdateData) => {
  updateNicknameFromServer(nicknameToUpdateData);
});
socket.on('removeNickname', (nicknameToRemove) => removeNicknameFromServer(nicknameToRemove));
socket.on('messagesToLoad', (messages) => loadDBMessages(messages));

window.onload = () => {
  setInitialNicknameIntoSessionStorage();
  requestMessagesToLoad();
};
