const socket = window.io();


let userNick = '';

const userNew = document.querySelector('.inputNick').value;

const btnNick = document.querySelector('.btnNick');
const inputNick = userNew;
btnNick.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.inputNick').value = '';
  socket.emit('User', inputNick.value);
  sessionStorage.setItem('User', inputNick.value);
  return true;
});
      
const btnMess = document.querySelector('.sendButton');
const inputMessage = document.querySelector('.inputMessage');
console.log(inputMessage.value);
btnMess.addEventListener('click', (e) => {
    e.preventDefault();
  if (userNew.length === 0 ) {
    userNick = socket.id.slice(0, 16);
    sessionStorage.setItem('User', userNick);
    socket.emit('User', userNick); //Não Implementado
  }
  const Objmsg = { nickname: userNick, chatMessage: inputMessage.value, };
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

const createUser = (user) => {
  const userUl = document.querySelector('#user');
  const li = document.createElement('li');
  li.innerText = user;
  li.setAttribute('data-testid', 'online-user');
  userUl.appendChild(li);
};

socket.on('serverMessage',  message  => createMessage(message));

socket.on('User', ({ User }) => createUser(User));
