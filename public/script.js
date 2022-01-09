const socket = window.io();

function renderMessage(message) {
  const listMessages = document.querySelector('.messages');

  const listItem = document.createElement('li');
  listItem.innerText = message;

  listItem.setAttribute('data-testid', 'message');

  listMessages.append(listItem);
}

function renderOnlineUsers(userName, id) {
  const onlineUsers = document.querySelector('.onlineUsers');

  const listItem = document.createElement('li');
  listItem.innerText = userName;

  listItem.setAttribute('data-testid', 'online-user');
  listItem.setAttribute('id', id);

  onlineUsers.append(listItem);
}

function deleteUser(id) {
  const userListItem = document.getElementById(id);
  userListItem.remove();
}

socket.on('message', (message) => {
  renderMessage(message);
});

const sendBtn = document.querySelector('.sendBtn');

sendBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const author = document.querySelector('input[name="username"]').value;
  const message = document.querySelector('input[name="message"]').value;

  const updatedUser = sessionStorage.getItem('user');
  
  const obj = {
    chatMessage: message,
    nickname: updatedUser || author,
  };

  socket.emit('message', obj);
});

socket.on('connectedUser', (user) => renderOnlineUsers(user, user));

socket.on('currentConnectedUsers', ({ connectedUsers, onlineUser }) => {
  connectedUsers.forEach((user) => {
    if (user.connectedUser !== onlineUser) {
      renderOnlineUsers(user.userNickName, user.connectedUser);
    }
  }); 
});

const userBtn = document.querySelector('.nickBtn');
const userInput = document.querySelector('.nickInput');

userBtn.addEventListener('click', (event) => {
  event.preventDefault();

  sessionStorage.setItem('user', userInput.value);
  const nickName = userInput.value;

  socket.emit('updatedNickName', nickName);
});

socket.on('currentNickName', ({ nickName, onlineUser }) => {
  const userListItem = document.getElementById(onlineUser);
  
  userListItem.innerText = nickName;
});

socket.on('removedUser', ({ onlineUser }) => {
  deleteUser(onlineUser);
});
