const socket = window.io();
const formButtonMessages = document.querySelector('#sendButton');
const messageInput = document.querySelector('#messageInput');
const nicknameInput = document.querySelector('#nicknameInput');
const messagesUl = document.querySelector('#messages');
const randomNickname = document.querySelector('#randomNickname');

// https://www.codegrepper.com/code-examples/javascript/find+random+name+javascript - 
function getRandomChars() {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 16; i += 1) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

randomNickname.innerText = getRandomChars(); // adiciona random no HTML

formButtonMessages.addEventListener('click', (e) => {
  e.preventDefault();
 
  const message = messageInput.value;
  messageInput.value = '';
  const nickname = nicknameInput.value;
  // nicknameInput.value = '';

  const data = {
    chatMessage: message,
    nickname,
  };
  
  // console.log({ data });

  socket.emit('message', data);
}); 

const createMessage = (chatMessage) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = chatMessage;
  messagesUl.appendChild(li);
};

socket.on('message', (chatMessage) => createMessage(chatMessage));