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
  const lastLogin = users[users.length - 1];
  sessionStorage.setItem('nickName', lastLogin);

  ulUsers.innerHTML = `<li class="log-user">${lastLogin}</li>`;

  for (let index = 0; index < users.length - 1; index += 1) {
    ulUsers.innerHTML += `<li class="log-user">${users[index]}</li>`;
  }
}

function createUser(user) {
  const ulUsers = document.querySelector('.users');

  ulUsers.innerHTML += `<li class="log-user">${user}</li>`;
}

socket.on('message', (messages) => {
  updateMessagesOnScreen(messages);
});

socket.on('update_users', (users) => {
  updateUsersOnScreen(users);
});

socket.on('update_logged_users', (data) => {
  const nomes = document.querySelectorAll('.log-user');

  nomes.forEach((el) => {
    const newEl = el;
    if (newEl.innerText === data.lastName) {
      newEl.innerText = data.user;
    }
  });
});

socket.on('new_user', (user) => {
  createUser(user);
  sessionStorage.setItem('nickName', user);
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

userForm.addEventListener('submit', (event) => {
  const loggedUser = document.querySelector('.log-user');
  event.preventDefault();
  name = document.forms.userForm.inputName.value;
  userForm.parentNode.removeChild(userForm);
  loggedUser.innerText = name;
  socket.emit('update_user', { user: name, lastName: sessionStorage.nickName });
  sessionStorage.setItem('nickName', name);
});
