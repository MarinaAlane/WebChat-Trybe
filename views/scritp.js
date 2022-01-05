const socket = window.io();

let userNick = '';

const btnNick = document.querySelector('.btnNick');

btnNick.addEventListener('click', (e) => {
  const inputNick = document.querySelector('.inputNick');
  e.preventDefault();
  socket.emit('User', inputNick.value);
  sessionStorage.setItem('User', inputNick.value);
  document.querySelector('.inputNick').value = '';
  return true;
});
      
const btnMess = document.querySelector('.sendButton');
btnMess.addEventListener('click', (e) => {
  const inputMessage = document.querySelector('.inputMessage');
  e.preventDefault();
  if (sessionStorage.getItem('User').length === 0) {
    userNick = socket.id.slice(0, 16);
    sessionStorage.setItem('User', userNick);
    socket.emit('User', userNick);
  }
  const Objmsg = {
    nickname: sessionStorage.getItem('User'),
    chatMessage: inputMessage.value,
  };
  socket.emit('message', Objmsg);
  document.querySelector('.inputMessage').value = '';
  return true;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

const createUser = (User) => {
  const userUl = document.querySelector('#user');
  const li = document.createElement('li');
  li.innerText = User;
  li.setAttribute('data-testid', 'online-user');
  userUl.appendChild(li);
};

socket.on('serverMessage', (message) => createMessage(message));

socket.on('User', (User) => createUser(User));
