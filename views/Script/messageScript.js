const socket = window.io();

const messageList = document.getElementById('messages');

const insertIntoMessageList = (messages) => {
  messages.forEach(({ timestamp, nickname, message }) => {
    const msg = document.createElement('li');
    msg.textContent = `${timestamp} - ${nickname}: ${message}`;
    msg.setAttribute('data-testid', 'message');
    messageList.appendChild(msg);
    window.scrollTo(0, document.body.scrollHeight);
  });
};

const listAllMessages = () => {
  socket.on('messageHistory', (allMessages) => {
    messageList.innerHTML = '';
    insertIntoMessageList(allMessages);
  });
};

listAllMessages();

const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    // const chatMessage = input.value;
    // socket.emit('message', { nickname, chatMessage });
    input.value = '';
  }
});

// ..source: https://stackoverflow.com/questions/18648500/add-id-class-to-objects-from-createelement-method
const messagesHistory = [];

socket.on('message', (msg) => {
  const messages = document.getElementById('messages');
  const item = document.createElement('li');
  item.textContent = msg;
  messagesHistory.push(msg);
  item.setAttribute('data-testid', 'message');
  sessionStorage.setItem('messages', messagesHistory);
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
