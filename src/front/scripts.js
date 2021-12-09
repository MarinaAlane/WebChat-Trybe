const selectors = {
    testIds: {
      onlineUser: '[data-testid="online-user"]',
      messageBox: '[data-testid="message-box"]',
      nickNameBox: '[data-testid="nickname-box"]',
      nickNameButton: '[data-testid="nickname-button"]',
      sendButton: '[data-testid="send-button"]',
    },
    ids: {
      onlineUserId: 'online-user',
    },
};

const {
    testIds: { onlineUser, messageBox, nickNameBox, nickNameButton, sendButton },
    ids: { onlineUserId },
  } = selectors;

const socket = window.io();

function setSessionUser(nickName) {
    sessionStorage.setItem('webChatUser', nickName);
}

function renderUser(nickName) {
    const onlineUsersUl = document.getElementById(onlineUserId);
    const li = document.createElement('li');
    li.setAttribute('data-testid', onlineUserId);
    li.innerText = nickName;

    onlineUsersUl.appendChild(li);
}

function getAllLoggedUsers() {
    const allUsers = [];

    document.querySelectorAll(onlineUser)
        .forEach((child) => allUsers.push(child.innerText));

    return allUsers;
}

function requestNickName() {
  socket.emit('nickName');
}
  
function renderNickName() {
  socket.on('nickName', (userNickName) => {
    setSessionUser(userNickName);
    renderUser(userNickName);
    socket.emit('userSignIn', userNickName);
  });
}

function renderMessageList(message) {
    const messagesUl = document.getElementById('messages');
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'message');
    li.innerText = message;

    messagesUl.appendChild(li);
}

function sendNewMessage() {
  const nickname = document.querySelector(onlineUser).innerText;
  const chatMessage = document.querySelector(messageBox).value;
  socket.emit('message', { chatMessage, nickname });
  document.querySelector(messageBox).value = '';
}

function changeNickName(nickName) {
    const onlineUserNickName = document.querySelector(onlineUser);

    onlineUserNickName.innerText = nickName;
    setSessionUser(nickName);
}

document.querySelector(nickNameButton).addEventListener('click', (e) => {
    e.preventDefault();
    const nickNameTag = document.querySelector(nickNameBox);
    const nickNameValue = nickNameTag.value;
    changeNickName(nickNameValue);
    socket.emit('updateUserName', nickNameValue);
    nickNameTag.value = '';
  });
  
  document.querySelector(sendButton).addEventListener('click', (e) => {
    e.preventDefault();
    sendNewMessage();
  });

  socket.on('message', (message) => {
    renderMessageList(message);
  });

  socket.on('loadMessages', (messages) => {
    document.getElementById('messages').innerHTML = '';
    messages.forEach(({ message, nickname, timestamp }) => {
      renderMessageList(`${timestamp} - ${nickname}: ${message}`);
    });
  });

  socket.on('userSignIn', (nickName) => {
    renderUser(nickName);
    socket.emit('loggedUsers', sessionStorage.getItem('webChatUser'));
  });

  socket.on('loggedUsers', (loggedUser) => {
    const allUsers = getAllLoggedUsers();

    if (allUsers.includes(loggedUser)) return;

    renderUser(loggedUser);
  });

  socket.on('removeUser', (userNickName) => {
    const allUsers = getAllLoggedUsers();
  
    document.getElementById(onlineUserId).innerHTML = '';
  
    allUsers.forEach((user) => {
      if (user === userNickName) return;

      renderUser(user);
    });
  });
  
  socket.on('updateUserName', ({ prevName, currName }) => {
    const allUsers = getAllLoggedUsers();
  
    document.getElementById(onlineUserId).innerHTML = '';
  
    allUsers.forEach((user) => {
      if (user === prevName) return renderUser(currName);
  
      renderUser(user);
    });
  });
  
  function loadMessages() {
    socket.emit('loadMessages');
  }

window.onload = () => {
    renderNickName();
    loadMessages();
    requestNickName();
};