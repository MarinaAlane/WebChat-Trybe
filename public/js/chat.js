const socket = window.io();

const nickName = document.querySelector('#nickName');
const nickBtn = document.querySelector('#nickBtn');
const messageInput = document.querySelector('#textMessage');
const submitBtn = document.querySelector('#submitMessage');
const onlineUsers = document.querySelector('.online-users');

const setSessionStorage = (nick) => sessionStorage.setItem('webChatNickName', nick);

const getSessionStorage = () => sessionStorage.getItem('webChatNickName');

const displayNewMessage = (message) => {
  const messages = document.querySelector('.messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = `${message}`;
  messages.appendChild(li);
  return li;
};

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('message', ({ nickname: nickName.innerText, chatMessage: message }));
  messageInput.value = '';
});

nickBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const nick = document.querySelector('#nickInput');
  setSessionStorage(nick.value);
  socket.emit('updateNickName', nick.value);
  nick.value = '';
});

const handleOnlineUsers = (nick) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = nick;
  onlineUsers.appendChild(li);
};

socket.on('getNickName', ((nick) => {
  nickName.innerHTML = nick;
}));

socket.on('message', (message) => displayNewMessage(message));

socket.on('onlineUsers', (users) => {
  onlineUsers.innerHTML = '';
  const userList = Object.values(users);
  const index = userList.indexOf(nickName.innerText);
  handleOnlineUsers(userList[index]);
  userList.filter((user) => user !== userList[index]).forEach((nick) => handleOnlineUsers(nick));
});

window.onload = () => {
  const nick = getSessionStorage();
  if (nick) socket.emit('updateNickName', nick);
};

window.onbeforeunload = () => {
  socket.disconnect();
};