const socket = window.io();

const messageInput = document.querySelector('#messageInput');
const chatList = document.querySelector('#chatList');

const sendMessage = () => {
  const message = messageInput.value;
  socket.emit('message', message);
  // addOwnMessage(message);
  messageInput.value = '';
};

messageInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) return sendMessage();
});

const addMessageToChat = (message) => {
  const date = new Date().toLocaleString();

  const li = document.createElement('li');
  li.classList.add('clearfix');
  const div = document.createElement('div');
  div.classList.add('message-data');
  const span = document.createElement('span');
  span.classList.add('message-data-time');
  span.innerText = date;
  div.appendChild(span);
  li.appendChild(div);
  const div2 = document.createElement('div');
  div2.classList.add('message', 'my-message');
  div2.innerText = message;
  li.appendChild(div2);
  chatList.appendChild(li);
};

socket.on('message', (data) => addMessageToChat(data));

// const addOwnMessage = (message) => {
//   const date = new Date().toLocaleString();
//   const li = document.createElement('li');
//   li.classList.add('clearfix');
//   const div = document.createElement('div');
//   div.classList.add('message-data', 'text-right');
//   const span = document.createElement('span');
//   span.classList.add('message-data-time');
//   span.innerText = date;
//   div.appendChild(span);
//   li.appendChild(div);
//   const div2 = document.createElement('div');
//   div2.classList.add('message', 'other-message', 'float-right');
//   div2.innerText = message;
//   li.appendChild(div2);
//   chatList.appendChild(li);
// };
