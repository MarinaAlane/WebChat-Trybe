const socket = window.io('http://localhost:3000');

let nickname = null;

// function updateMessagesOnScreen(messages) {
//   const divMessages = document.querySelector('#messages');

//   let listMessages = '<ul>';
//   messages.forEach((message) => {
//     listMessages += `<li>${message.user}: ${message.msg}</li>`;
//   });
//   listMessages += '</ul>';

//   divMessages.innerHTML = listMessages;
// }

const divUser = document.querySelector('#users');
socket.on('connection', (id) => {
  nickname = id;
  const liUsers = document.createElement('li');
  liUsers.innerText = id;
  divUser.appendChild(liUsers);
});

const divMessages = document.querySelector('#messages');
const inputMessage = document.querySelector('#message');
const formMessage = document.querySelector('#message_form');
formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  socket.emit('message', { chatMessage, nickname });
});

socket.on('message', (inform) => {
  const liMessage = document.createElement('li');
  liMessage.innerText = inform;
  divMessages.appendChild(liMessage);
});

// function updateUsersOnScreen(users) {
//   // let listUsers = '<ul>';
//   // users.forEach((user) => {
//   //   listUsers += `<li>${user.user}</li>`;
//   // });
//   // listUsers += '</ul>';

//   // divUser.innerHTML = listUsers;
// }

// socket.on('update_messages', (messages) => {
//   updateMessagesOnScreen(messages);
// });

// socket.on('update_users', (users) => {
//   updateUsersOnScreen(users);
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.querySelector('#message_form');
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     if (!nickName) {
//       return alert('Defina um usuário');
//     }
//     const message = document.forms.message_form_name.msg.value;
//     document.forms.message_form_name.msg.value = '';
//     socket.emit('new_message', { user: nickName, msg: message });
//   });
// });

// const userForm = document.querySelector('#user_form');
// userForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   nickName = document.forms.user_form_name.user.value;
//   if (!nickName) {
//     return alert('Defina um usuário');
//   }
//   userForm.parentNode.removeChild(userForm);
//   socket.emit('new_user', { user: nickName });
// });