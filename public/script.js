const socket = window.io('http://localhost:3000');

let name = null;

function updateMessagesOnScreen(messages) {
  const ulMessages = document.querySelector('.messages');

  if (!messages) return;

  ulMessages.innerHTML = '';

  messages.forEach((message) => {
    ulMessages.innerHTML += `<li>${message.user}: ${message.msg}</li>`;
  });
}

function updateUsersOnScreen(users) {
  const ulUsers = document.querySelector('.users');

  if (!users) return;

  ulUsers.innerHTML = '';

  users.forEach(({ user }) => {
    ulUsers.innerHTML += `<li>${user}</li>`;
  });
}

socket.on('update_messages', (messages) => {
  updateMessagesOnScreen(messages);
});

socket.on('update_users', (users) => {
  updateUsersOnScreen(users);
});

document.addEventListener('DOMContentLoaded', () => {
  const formMessage = document.querySelector('.form-message');

  formMessage.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!name) {
      return;
    }
  
    const message = document.forms.formMessage.inputMessage.value;
    document.forms.formMessage.inputMessage.value = '';
    socket.emit('new_message', { user: name, msg: message });
  });
});

const userForm = document.querySelector('.user-form');
// const usersUl = document.querySelector('.users');
userForm.addEventListener('submit', (event) => {
  event.preventDefault();
  name = document.forms.userForm.inputName.value;
  // usersUl.innerHTML += user;
  userForm.parentNode.removeChild(userForm);
  socket.emit('new_user', { user: name });
});
