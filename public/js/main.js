const socket = window.io();

const chatMessage = document.getElementById('chatMessage');
const nickname = document.getElementById('nickname');
const sendMessageButton = document.getElementById('sendButton');
const onlineUserElement = document.getElementById('onlineUser');
// const messageList = document.getElementById('user-message');

const generateNickname = () => {
  let finalNickname = '';
  const possibilities = 'a1b2c3d4e5f6g7h8i9j0klmnopqrstuvwxyz';

  for (let i = 0; i < 16; i += 1) {
    finalNickname += possibilities
      .charAt(Math.floor(Math.random() * possibilities.length));
  }
  return finalNickname;
};

const insertInitialNickname = () => {
  onlineUserElement.innerText = generateNickname();
};

window.onload = () => {
  insertInitialNickname();
};

sendMessageButton.addEventListener('click', () => {
  const data = { nickname: nickname.value, chatMessage: chatMessage.value };

  socket.emit('message', data);

  socket.on('message', (newMessage) => {
    console.log(newMessage);
  });
});
