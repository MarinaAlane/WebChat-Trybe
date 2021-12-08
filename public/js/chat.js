const socket = window.io();

console.log(window);
const spanNick = document.querySelector('#currNickName');
let userName = spanNick.innerText;

const formSendMSg = document.querySelector('#msgForm');
const inputMsg = document.querySelector('#msgInput');
formSendMSg.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    chatMessage: inputMsg.value,
    nickname: userName || socket.id,
  });
  return false;
});

const createMessage = (message) => {
  const chatUl = document.querySelector('#chatUl');
  const commentLi = document.createElement('li');
  commentLi.innerText = message;
  commentLi.setAttribute('data-testid', 'message');
  chatUl.appendChild(commentLi);
};

socket.on('message', (message) => createMessage(message));

const formUserName = document.querySelector('#userForm');
const inputUserName = document.querySelector('#userInput');
formUserName.addEventListener('submit', (e) => {
  e.preventDefault();
  spanNick.innerText = inputUserName.value;
  userName = inputUserName.value;
});