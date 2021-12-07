const socket = window.io('http://localhost:3000');

let nickName = null;

function updateMessagesOnScreen(messages) {
  const divMessages = document.querySelector('#messages');

  let listMessages = '<ul>';
  messages.forEach((message) => {
    listMessages += `<li>${message.user}: ${message.msg}</li>`;
  });
  listMessages += '</ul>';

  divMessages.innerHTML = listMessages;
}

function updateUsersOnScreen(users) {
  const divUser = document.querySelector('#users');

  let listUsers = '<ul>';
  users.forEach((user) => {
    listUsers += `<li>${user.user}</li>`;
  });
  listUsers += '</ul>';

  divUser.innerHTML = listUsers;
}

socket.on('update_messages', (messages) => {
  updateMessagesOnScreen(messages);
});

socket.on('update_users', (users) => {
  updateUsersOnScreen(users);
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#message_form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!nickName) {
      return alert('Defina um usuário');
    }
    const message = document.forms.message_form_name.msg.value;
    document.forms.message_form_name.msg.value = '';
    socket.emit('new_message', { user: nickName, msg: message });
  });
});

const userForm = document.querySelector('#user_form');
userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  nickName = document.forms.user_form_name.user.value;
  if (!nickName) {
    return alert('Defina um usuário');
  }
  userForm.parentNode.removeChild(userForm);
  socket.emit('new_user', { user: nickName });
});