const socket = window.io();

const msgForm = document.querySelector('#msg-form');
const msgInput = document.querySelector('#msg-input');
const nickForm = document.querySelector('#nick-form');
const nickInput = document.querySelector('#nickname');

// evitar problema de duplicidade
const DATA_TESTID = 'data-testid';

// criando nickname randomico
// https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript/
const randomNickGenerator = () => {
  let nickname = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i += 1) {
    nickname += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  sessionStorage.setItem('nickname', nickname);
  socket.emit('userLogged', nickname);
  return nickname;
};

socket.on('userLogged', (nickUsers) => {
  const userOnline = document.querySelector('#user-online');
  userOnline.innerHTML = '';
  const currentNick = sessionStorage.getItem('nickname');
  console.log(userOnline, 'USERONLINE');
  nickUsers.forEach(({ nickname }) => {
    const nickLi = document.createElement('li');
    nickLi.innerText = currentNick;
    nickLi.setAttribute(DATA_TESTID, 'online-user');
    if (nickname !== currentNick) {
      const newNickLi = document.createElement('li');
      nickLi.innerText = nickname;
      nickLi.setAttribute(DATA_TESTID, 'online-user');
      userOnline.appendChild(nickLi);
      console.log(newNickLi.innerText = nickname, 'NEW-USER');
    } else {
      userOnline.insertBefore(nickLi, userOnline.firstChild);
    }
  });
});

socket.on('message', (message) => {
  const messages = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
});

// evento do nickname
nickForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = nickInput.value;
  if (nickInput.value) {
    socket.emit('updateNickname', nickname);
    sessionStorage.setItem('nickname', nickname);
  }
  return false;
});

// evento do input mensagem
msgForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const getNick = sessionStorage.getItem('nickname');
  const chatMessage = msgInput.value;
  if (msgInput.value) {
    socket.emit('message', { chatMessage, nickname: getNick });
    // console.log(msgInput.value, 'CHATMESSAGE');
    msgInput.value = '';
  }
  return false;
});

window.onload = () => {
  randomNickGenerator();
};