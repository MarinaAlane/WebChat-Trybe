const socket = window.io('http://localhost:3000');
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const messagesDiv = document.querySelector('#messages'); // p das mensagens
const ulUsers = document.querySelector('#ulUsers'); // ul dos usuários
const inputUser = document.querySelector('#inputUser'); // input de nickname
const formUser = document.querySelector('#formUser'); // form de usuário
const user = document.createElement('li');  

const DATA = 'data-testid';
const ONLINE = 'online-user';

socket.on('userOnline', (online) => {
  ulUsers.textContent = '';
  const sortedUsers = [...online].sort((a, b) => {
    if (a.id === socket.id) return -1;
    if (b.id === socket.id) return 1;
    return 0;
  });
  sortedUsers.forEach(({ arrayUsers }) => {
    user.textContent = arrayUsers;
    user.setAttribute(DATA, ONLINE);
    ulUsers.appendChild(user);
  });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log('cliquei')
    if (input.value) {
      socket.emit('message', {
        chatMessage: input.value,
        nickname: inputUser.value,
      });
      // console.log('chatMessage' + input.value);
    }
    input.value = '';
    return false;
});

socket.on('message', (msg) => {
  const p = document.createElement('p');
  p.textContent = msg;
  p.setAttribute('data-testid', 'message');
  console.log(p, 'esse é o p da mensagem');
  messagesDiv.appendChild(p);
  window.scrollTo(0, document.body.scrollHeight);
});
// Lógica explicada e entendida pelo aluno Marcelo Leite durante o recesso

formUser.addEventListener('submit', (e) => {
  e.preventDefault();
  let nickname = inputUser.value;
  nickname = user.textContent;
  socket.emit('Nickname', nickname);
  sessionStorage.setItem('nickname', nickname);
  return true;
});

// socket.on('listUsers', (currentNickname, newNickname) => {
//   socket.emit('Nickname', nickname);
// });
