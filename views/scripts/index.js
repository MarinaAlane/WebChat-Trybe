const socket = window.io();

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.dataset.testid = 'message';
  messagesUl.appendChild(li);
};

window.onload = () => {
  socket.emit('newNickname');
  socket.on('allMessages', (messages) => {
    messages.map(({ timestamp, nickname, message }) => `${timestamp} - ${nickname}: ${message}`)
      .forEach((message) => createMessage(message));
  });
};

const sendMessageForm = document.querySelector('#send-message-form');
const saveNicknameForm = document.querySelector('#save-nickname-form');
let actualNickname;
let actualMessage;

sendMessageForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const messageInput = document.querySelector('#client-message');
  actualMessage = messageInput.value;
  socket.emit('message', { 
    chatMessage: messageInput.value,
    nickname: actualNickname,
  });
  messageInput.value = '';
});

saveNicknameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nicknameInput = document.querySelector('#nickname');
  socket.emit('updateNickname', nicknameInput.value);
  nicknameInput.value = '';
});

const createNickname = ({ id = socket.id, nickname }) => {
  const nicknameUl = document.querySelector('#nicknames');
  const nicknameLi = document.createElement('li');
  nicknameLi.innerText = nickname;
  nicknameLi.dataset.testid = 'online-user';
  nicknameLi.dataset.id = id;
  nicknameUl.appendChild(nicknameLi);
  actualNickname = nickname;
};

const clearNicknamesList = () => {
  const nicknameUl = document.querySelector('#nicknames');
  nicknameUl.innerHTML = '';
};

const saveMessage = async (message) => {
  if (message.includes(actualNickname) && message.includes(actualMessage)) {
    await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: actualMessage,
        nickname: actualNickname,
        id: socket.id,
      }),
    });
  }
};

const sortUsers = (users) => {
  // if (users.length === 0) return users;
  console.log(users);
  return users;
  // const primaryUser = users.find((user) => user.id === socket.id);
  // const usersWithoutPrimaryUser = users.filter((user) => user.id !== socket.id);
  // return [primaryUser, ...usersWithoutPrimaryUser];
};

socket.on('message', async (message) => {
  await saveMessage(message);
  createMessage(message);
});

socket.on('renderUsersList', (usersList) => {
  clearNicknamesList();
  sortUsers(usersList).forEach((user) => {
    createNickname(user);
  });
});
