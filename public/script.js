const socket = window.io();

function renderMessage(message) {
  const divMsg = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  divMsg.append(li);
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
  renderMessage(message);
});

const sendBtn = document.querySelector('.sendButton');

sendBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const user = document.querySelector('input[name="username"]').value;

  const message = document.querySelector('input[name="message"]').value;

  const messageObject = {
    chatMessage: message,
    nickname: user,
  };

    socket.emit('message', messageObject);
});

socket.on('connectUser', (user) => usersOnline(user, user));

socket.on('currConnUsers', ({ usersConnection, onlineUser }) => {
  usersConnection.forEach((user) => {
    if (user.userConnected !== onlineUser) {
      usersOnline(user.userConnected, user.userNickName);
    }
  });
});

const userBtn = document.querySelector('.nickButton');
const userInput = document.querySelector('.nickInput');
userBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const nickName = userInput.value;
  socket.emit('updatedNickName', nickName);
});

socket.on('currNickName', ({ nickName, onlineUser }) => {
  const userLi = document.getElementById(onlineUser);
  userLi.innerText = nickName;
});

socket.on('removedUser', ({ onlineUser }) => {
  deleteUser(onlineUser);
}); 