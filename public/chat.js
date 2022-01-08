const socket = window.io();

const form = document.querySelector('#form');
const buttonNick = document.querySelector('#nickname-button');
/* const userOnline = [];
 */
form.addEventListener('submit', (e) => {
  const input = document.querySelector('#message-box');
  e.preventDefault();
  if (input.value) {
    socket.emit('message', { nickname: socket.id, chatMessage: input.value });
    input.value = '';
  }
});

const createIl = (text, ul, testId) => {
  const li = document.createElement('li');
  li.innerText = text;
  li.setAttribute('data-testid', testId);
  ul.appendChild(li);
}; 
    
socket.on('message', (message) => {
  const messagesUl = document.querySelector('#messages');
  createIl(message, messagesUl, 'message');
}); 

socket.on('connection', (id) => {
  const i = id.slice(0, -4);
/*   userOnline.push(id);
 */ const userUl = document.querySelector('#users');
  createIl(i, userUl, 'online-user');
  /* userOnline.forEach((e) => ); */
});

buttonNick.addEventListener('button', () => {
/*   const nickName = document.querySelector('#nickname-box');
 */  
});
