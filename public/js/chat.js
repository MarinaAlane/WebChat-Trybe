const socket = window.io();

const nickName = document.querySelector('#nickName');
const nickBtn = document.querySelector('#nickBtn');
const messageInput = document.querySelector('#textMessage');
const submitBtn = document.querySelector('#submitMessage');

socket.on('nickName', ((nick) => {
  nickName.innerHTML = nick;
}));

const displayNewMessage = (message) => {
  const messages = document.querySelector('.messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = `${message}, ${nickName.innerHTML}`;
  messages.appendChild(li);
  return li;
};

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  displayNewMessage(message);
  socket.emit('message', ({ nickname: nickName.innerText, chatMessage: message }));
  messageInput.value = '';
});

nickBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const nickInput = document.querySelector('#nickInput').value;
  console.log(nickInput);
  socket.emit('nickName', nickInput);
});

socket.on('message', (message) => displayNewMessage(message));

window.onbeforeunload = () => {
  socket.disconnect();
};