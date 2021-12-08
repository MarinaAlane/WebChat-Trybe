const socket = window.io('http://localhost:3000');
let userNickname = null;

const updateMessagesOnScreen = (messages) => {
  const divMessages = document.querySelector('#messages');
 
  let listMessages = '<ul>';
  if (!messages) return;

  messages.forEach(({ msg }) => {
    listMessages += `<li>${msg}</li>`;
  });
  listMessages += '</ul>';

  divMessages.innerHTML = listMessages;
};

const updateUserOnScreen = (users) => {
  const divUser = document.querySelector('.user');

  let listUser = '<ul>';
  if (!users) return;

  users.forEach(({ user }) => {
    listUser += `<li>${user}</li>`;
  });
  listUser += '</ul>';

 divUser.innerHTML = listUser;
};

socket.on('update_messages', (messages) => {
  console.log(messages)
  updateMessagesOnScreen(messages);
  updateUserOnScreen(messages);
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#message_form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const message = document.forms.message_form_name.msg.value;
  
    document.forms.message_form_name.msg.value = '';
    socket.emit('message', { nickname: userNickname, chatMessage: message });
  });

  const userForm = document.querySelector('#user_form');

  userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userNickname = document.forms.user_form_name.user.value;
  });
});