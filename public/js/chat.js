const socket = window.io();

const form = document.querySelector('#message-form');
const nicknameForm = document.querySelector('#nickname-form');
const newnickname = document.querySelector('#nicknamebox');

const inputMessage = document.querySelector('#messageInput');
const usersList = document.querySelector('#users');
const usersListArr = document.getElementById('users').getElementsByTagName('li');

const makeNickName = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let index = 0; index < 16; index += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  sessionStorage.setItem('nickname', text);

  return text;
};

window.onload = () => {
  const nickUser = makeNickName();
  socket.emit('new-user', { user: nickUser, userOld: null });
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nickname = sessionStorage.getItem('nickname');  
  
  const chatMessage = inputMessage.value;   

  socket.emit('message', { chatMessage, nickname });
  inputMessage.value = '';
  return false;
});

nicknameForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newNickname = newnickname.value;
  const oldNickname = sessionStorage.getItem('nickname');

  sessionStorage.setItem('nickname', newNickname);

  socket.emit('new-user', { user: newNickname, userOld: oldNickname });

  newnickname.value = '';
  return false;
});

const createMessage = (userMessage) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = userMessage;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li); 
};

socket.on('message', (userMessage) => createMessage(userMessage));

socket.on('update-nicknames', (arrayUsers) => {
  usersList.innerHTML = '';
  const arr = [];

  console.log(arrayUsers)

  const usernickname = sessionStorage.getItem('nickname');

  const fisrtLi = document.createElement('li');
  fisrtLi.innerText = usernickname;
  fisrtLi.setAttribute('data-testid', 'online-user');

  arr.push(fisrtLi);
  
  arrayUsers.forEach((element) => {
    if (element.user === usernickname) return;
    const li = document.createElement('li');
    li.innerText = element.user;
    li.setAttribute('data-testid', 'online-user');
    arr.push(li);
  });
  arr.forEach((elements) => usersList.appendChild(elements));
});

// socket.on('disconnect', () => {
//   const user = sessionStorage.getItem('nickname');
//   socket.emit('disconect-user', user);
// });

// window.onbeforeunload = () => {
//   socket.emit('disconnect', sessionStorage.getItem('nickname')); 
// };

// window.addEventListener('beforeunload',
// () => {
//   // socket.emit('event', { user: sessionStorage.getItem('nickname'), id: socket.id });
//   const userToRemove = sessionStorage.getItem('nickname');
//   const newArr = Array.from(usersListArr).map((element) => element.innerText);
//   if (userToRemove.length > 1) {
//       console.log(newArr);
//       const arr = newArr.filter((user) => user !== userToRemove);
//       socket.emit('event', arr);
//     }
//   sessionStorage.clear();
//   });
