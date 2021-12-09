const socket = window.io('http://localhost:3000');

const getUsersList = document.getElementById('onlineUsersId');
const buttonMessage = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');
const listMessage = document.getElementById('listMessage');
const saveNickNameButton = document.getElementById('nicknameButton');
const nickNameInput = document.getElementById('nicknameInput');

const saveRandomId = (id) => {
  const onlineUsers = document.createElement('li');
  onlineUsers.innerText = id;
  onlineUsers.setAttribute('data-testid', 'online-user');
  onlineUsers.setAttribute('class', 'online-user');
  getUsersList.appendChild(onlineUsers);
};

const onlineuser = '.online-user';

saveNickNameButton.addEventListener('click', (event) => {
  event.preventDefault();
  const newUser = nickNameInput.value;
  const username = document.querySelector(onlineuser);
  username.innerText = newUser;
  socket.emit('change_user', { oldUser: sessionStorage.getItem('nickname'), newUser });
  sessionStorage.setItem('nickname', newUser);
});

socket.on('update_user', (newUser, oldUser) => {
  const usersnames = document.querySelectorAll(onlineuser);
  usersnames.forEach((res) => {
    if (res.innerText === oldUser) {
      res.innerText = newUser;
    }
  });
});

buttonMessage.addEventListener('click', (event) => {
  event.preventDefault();
  socket.emit('message', {
    chatMessage: messageInput.value,
    nickname: nickNameInput.value,
  });
  messageInput.value = '';
  return false;
});

const newMessage = (data) => {
  const li = document.createElement('li');
  li.innerText = data;
  li.dataset.testid = 'message';
  listMessage.appendChild(li);
};

socket.on('message', (data) => newMessage(data));

socket.on('id', (id) => {
  const removeLastPosition = id[id.length - 1];
  sessionStorage.setItem('nickname', removeLastPosition);
  saveRandomId(removeLastPosition);
  for (let index = 0; index < id.length - 1; index += 1) {
    const user = id[index];
    saveRandomId(user);
  }
});

socket.on('disconnect_user', (id) => {
  const allusers = document.querySelectorAll('.online-user');

  allusers.forEach((eachUser) => {
    if (eachUser.innerText === id) {
      eachUser.remove();
    }
  });
});

const fetchMessages = async () => {
  const result = await fetch('http://localhost:3000/chat');
  const response = await result.json();
  response.forEach((value) => {
    const message = `${value.timestamp} - ${value.nickname}: ${value.message}`;
    newMessage(message);
  });
};

fetchMessages();

socket.on('newId', (id) => {
  saveRandomId(id);
});
