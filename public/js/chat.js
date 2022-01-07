const socket = window.io();

const dataTestId = 'data-testid';

const randomNickname = () => {
  const randomEightChar = Math.random().toString(36).substr(2, 8);
  return randomEightChar + randomEightChar;
};
const onlineUser = document.getElementById('online-user');
onlineUser.innerText = randomNickname();

const saveBtn = document.getElementById('save-btn');

const addUser = (username) => {
  const usersList = document.getElementById('users-list');
  const li = document.createElement('li');
  li.setAttribute(dataTestId, 'online-user');
  li.innerText = username;
  
  usersList.appendChild(li);
  };

saveBtn.addEventListener('click', () => {
  const usernameInput = document.getElementById('username-input');
  const username = usernameInput.value;
  sessionStorage.setItem('username', username);

  socket.emit('updateUsername', { oldUsername: onlineUser.innerText, newUsername: username });
  socket.emit('username', username);
  onlineUser.innerText = username;
  
  usernameInput.value = '';
});

const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
  const verif = sessionStorage.getItem('username') != null;
  const username = verif ? sessionStorage.getItem('username') : onlineUser.innerText;
  const messageInput = document.getElementById('message-input');

  const newMessage = {
    chatMessage: messageInput.value,
    nickname: username,   
  };
 
  socket.emit('message', newMessage);

  messageInput.value = '';
});
const getUsers = () => {
  const usersList = document.getElementById('users-list');
  return usersList.children;
};

const userIsListed = (username) => {
  const users = getUsers();

  for (let index = 0; index < users.length; index += 1) {
    if (users[index].innerText === username) return true;
  }
  return false;
};

  socket.on('username', (data) => {
    onlineUser.innerText = data;
    sessionStorage.setItem('username', data);
    addUser(data);
  });
  
  socket.on('updateUsername', ({ oldUsername, newUsername }) => {
    const users = getUsers();
    for (let index = 0; index < users.length; index += 1) {
      if (users[index].innerText === oldUsername) {
        users[index].innerText = newUsername;
        break;
      }
    }
  });
  
  socket.on('loggedUser', (data) => {
    addUser(data);

    const username = onlineUser.innerText;

  socket.emit('loggedUser', username);
  });
  
  socket.on('addLoggedUsers', (username) => {
    if (!userIsListed(username)) addUser(username);
  });
  
  socket.on('removeUser', (username) => {
    const users = getUsers();
  
    for (let index = 0; index < users.length; index += 1) {
      if (users[index].innerText === username) {
        users[index].remove();
        break;
      }
    }
  });
  
  socket.on('message', (data) => {
    const messagesList = document.getElementById('messages-list');
    const li = document.createElement('li');
    li.setAttribute(dataTestId, 'message');
    li.innerText = data;
  
    messagesList.appendChild(li);
  });
  socket.on('messageHistory', (messages) => {
    const messagesList = document.getElementById('messages-list');
  
    messages.forEach((m) => {
      const { message, nickname, timestamp } = m;
  
      const li = document.createElement('li');
      li.setAttribute(dataTestId, 'message');
      li.innerText = `${timestamp} - ${nickname}: ${message}`;
  
      messagesList.appendChild(li);
    });
});
