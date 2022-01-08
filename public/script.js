const socket = window.io();

function renderMessage(message) {
  const UlMessages = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  UlMessages.append(li);
}

function renderOnlineUsers(userName, id) {
  const userList = document.querySelector('.userList');
  const li = document.createElement('li');
  li.innerText = userName;
  li.setAttribute('data-testid', 'online-user');
  li.setAttribute('id', id);
  userList.append(li);
}

function deleteUser(id) {
  const userLi = document.getElementById(id);
  userLi.remove();
}

// mensagens
socket.on('message', (message) => {
  renderMessage(message);
});

const sendButton = document.querySelector('.sendButton');

sendButton.addEventListener('click', (event) => {
  event.preventDefault();

  const author = document.querySelector('input[name="username"]').value;
  const message = document.querySelector('input[name="message"]').value;

  const updatedUser = sessionStorage.getItem('user');

  const messageObject = {
    chatMessage: message,
    nickname: updatedUser || author,
  };

    socket.emit('message', messageObject);
});

// usuarios
socket.on('connectedUser', (user) => renderOnlineUsers(user, user));

socket.on('currentConnectedUsers', ({ usersConnected, onlineUser }) => {
  usersConnected.forEach((user) => {
    if (user.userConnected !== onlineUser) {
      renderOnlineUsers(user.userNickName, user.userConnected);
    }
  });
});

const userButton = document.querySelector('.nickButton');
const userInput = document.querySelector('.nickInput');
userButton.addEventListener('click', (event) => {
  event.preventDefault();
  sessionStorage.setItem('user', userInput.value);
  const nickName = userInput.value;
  console.log(nickName, 'aqui!');
  socket.emit('updatedNickName', nickName);
});

socket.on('currentNickName', ({ nickName, onlineUser }) => {
  const userLi = document.getElementById(onlineUser);
  userLi.innerText = nickName;
});

socket.on('removedUser', ({ onlineUser }) => {
  deleteUser(onlineUser);
});
