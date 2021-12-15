const socket = window.io();

const formMessages = document.querySelector('#form-messages');
const inputMessage = document.querySelector('#messageInput');
const formNickname = document.querySelector('#form-nickname');
const inputNickname = document.querySelector('#nicknameInput');
const messagesUl = document.querySelector('#messages');
const usersListUl = document.querySelector('#online-users');

let usersListClient = [];

// HTML FUNCTIONS
const createServerMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const createChatMessage = (chatMessage) => {
  const li = document.createElement('li');
  li.innerText = chatMessage;
  messagesUl.appendChild(li);
};

const renderUsersList = () => {
  usersListUl.innerHTML = '';
  usersListClient.forEach((nickname) => {
    const li = document.createElement('li');
    li.innerText = nickname;
    usersListUl.appendChild(li);
  });
};

// NORMAL FUNCTIONS
const setNicknameIntoSessionStorage = (nickname) => sessionStorage.setItem('nickname', nickname);
const getNicknameFromSessionStorage = () => sessionStorage.nickname || (socket.id).substr(4);

const sendUsersListToServer = () => {
  socket.emit('usersListFromClient', usersListClient);
};

const addNewUserToList = (newUser) => {
  usersListClient.push(newUser);
  renderUsersList();
  sendUsersListToServer();
};

const updateListWithAllUsers = (usersListFromServer) => {
  if (usersListFromServer.length > usersListClient.length) {
    usersListClient = usersListFromServer;
    renderUsersList();
  }
};

const updateNicknameAndSendToServer = () => {
  const previusNickname = getNicknameFromSessionStorage();
  const newNickname = inputNickname.value;
  const nicknameIndex = usersListClient.indexOf(previusNickname);
  usersListClient[nicknameIndex] = newNickname;
  setNicknameIntoSessionStorage(newNickname);
  socket.emit('updateNickname', newNickname);
  inputNickname.value = '';
  renderUsersList();
};

const updateNicknameFromServer = ({ previusNickname, newNickname }) => {
  const nicknameIndex = usersListClient.indexOf(previusNickname);
  usersListClient[nicknameIndex] = newNickname;
  renderUsersList();
};

const removeNicknameFromServer = (nickname) => {
  const nicknameIndex = usersListClient.indexOf(nickname);
  usersListClient.splice(nicknameIndex, 1);
  renderUsersList();
};

// LISTENNERS FUNCTIONS
formMessages.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = getNicknameFromSessionStorage();
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
  return null;
});

formNickname.addEventListener('submit', (e) => {
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

window.onload = () => {
  setNicknameIntoSessionStorage((socket.id).substr(4));
};
