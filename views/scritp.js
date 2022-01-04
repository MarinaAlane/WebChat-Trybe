const socket = window.io();

let userNick = '';

const userNew = document.querySelector('.inputNick').value;
      
const btnMess = document.querySelector('.sendButton');
const inputMessage = document.querySelector('.inputMessage');
btnMess.addEventListener('click', (e) => {
  socket.emit('message', inputMessage.value);
  document.querySelector('.inputMessage').value = '';
  e.preventDefault();
  if (userNew.length === 0) {
    userNick = socket.id.slice(0, 16);
    sessionStorage.setItem('User', userNick);
    socket.emit('User', userNick);
}  
  return true;
});

const btnNick = document.querySelector('.btnNick');
const inputNick = userNew;
btnNick.addEventListener('click', (e) => {
  socket.emit('User', inputNick.value);
  sessionStorage.setItem('User', inputNick.value);
  document.querySelector('.inputNick').value = '';
  e.preventDefault();
  return true;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
}

const createUser = (user) => {
  const userUl = document.querySelector('#user');
  const li = document.createElement('li');
  li.innerText = user;
  li.setAttribute('data-testid', 'online-user');
  userUl.appendChild(li);
};

//socket.on('message', (message) => createMessage(message));
// var activeUser = sessionStorage.getItem("User")

socket.on('serverMessage', ({ message }) => createMessage(message));

socket.on('User', ({ User }) => createUser(User));
