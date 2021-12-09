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

saveNickNameButton.addEventListener('click', (event) => {
  event.preventDefault();
  socket.emit('id', {
    nickname: nickNameInput.value,
  });
  return false;
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

socket.on('newId', (id) => {
  saveRandomId(id);
});
