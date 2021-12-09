const socket = window.io();

const chatMessage = document.getElementById('chatMessage');
const nicknameInput = document.getElementById('nickname');
const nicknameButton = document.getElementById('nickname-button');
const sendMessageButton = document.getElementById('sendButton');
const userList = document.getElementById('userList');
const messageList = document.getElementById('messageList');

const generateNickname = () => {
  let finalNickname = '';
  const possibilities = 'a1b2c3d4e5f6g7h8i9j0klmnopqrstuvwxyz';

  for (let i = 0; i < 16; i += 1) {
    finalNickname += possibilities
      .charAt(Math.floor(Math.random() * possibilities.length));
  }
  
  return finalNickname;
};

const createUserElement = (nickname) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = nickname;
  userList.appendChild(li);
};

const createMessageElement = (message) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messageList.appendChild(li);
};

nicknameButton.addEventListener('click', () => {
  const oldNickname = sessionStorage.getItem('nickname');
  const newNickname = nicknameInput.value;
  sessionStorage.setItem('nickname', newNickname);
  socket.emit('updateUser', { oldNickname, newNickname });
});

sendMessageButton.addEventListener('click', () => {
  const data = {
    nickname: sessionStorage.getItem('nickname'),
    chatMessage: chatMessage.value,
  };
  socket.emit('message', data);
});

socket.on('message', (newMessage) => {
  createMessageElement(newMessage);
  // console.log(newMessage);
});

window.onload = () => {
  const randomNick = generateNickname();
  sessionStorage.setItem('nickname', randomNick);

  socket.emit('newUser', randomNick);
  socket.on('updateUser', (newUser) => {
    const currentUser = sessionStorage.getItem('nickname');
    userList.innerHTML = '';
    createUserElement(currentUser);
    newUser.forEach((user) => {
      console.log(user.nickname);
      if (user.nickname !== currentUser) { createUserElement(user.nickname); }
    });
  });

  socket.emit('getMessages');
  socket.on('showMessageHistory', (history) => {
    history.forEach(({ message, nickname, timestamp }) => {
      createMessageElement(`${timestamp} ${nickname}: ${message}`);
    });
  });
};