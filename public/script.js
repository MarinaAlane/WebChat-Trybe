const socket = window.io();

function Message(message) {
  const listMessages = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  listMessages.append(li);
}

function usersOnline(userName, id) {
  const onlineUsers = document.querySelector('.onlineUsers');
  const li = document.createElement('li');
  li.innerText = userName;
  li.setAttribute('data-testid', 'online-user');
  li.setAttribute('id', id);
  onlineUsers.append(li);
}

function deleteUser(id) {
  const userLi = document.getElementById(id);
  userLi.remove();
}

socket.on('message', (message) => {
  Message(message);
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

socket.on('connectUser', (user) => usersOnline(user, user));
socket.on('currUsers', ({ usersConnection, onlineUser }) => {
  usersConnection.forEach((user) => {
    if (user.userConnected !== onlineUser) {
      usersOnline(user.userNickName, user.userConnected);
    }
  });
});

const userButton = document.querySelector('.nickButton');
const userInput = document.querySelector('.nickInput');
userButton.addEventListener('click', (event) => {
  event.preventDefault();
  sessionStorage.setItem('user', userInput.value);
  const nickName = userInput.value;
  socket.emit('updatedNickName', nickName);
});

socket.on('currentNickName', ({ nickName, onlineUser }) => {
  const userLi = document.getElementById(onlineUser);
  console.log(nickName);
  userLi.innerText = nickName;
});

socket.on('removedUser', ({ onlineUser }) => {
  deleteUser(onlineUser);
});