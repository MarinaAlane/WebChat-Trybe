const socket = window.io();

const onlineUserList = document.getElementById('users');

// ================================== Message Form manipulation ===========================================

const messageBtn = document.getElementById('send-button');

messageBtn.addEventListener('click', () => {
  const nickname = sessionStorage.getItem('nickname') || onlineUserList;
  const getMessageFromInput = document.getElementById('message-box');
  const msg = {
    nickname,
    chatMessage: getMessageFromInput.value,
  };

  socket.emit('message', msg);
  getMessageFromInput.value = '';
});

// ====================================================================================================

// ================================== insert message into its list ===========================================

socket.on('message', (data) => {
  const messagesList = document.getElementById('messages');
  const message = document.createElement('li');
  message.setAttribute('dataTestId', 'message');
  message.innerText = data;

  messagesList.appendChild(message);
});
