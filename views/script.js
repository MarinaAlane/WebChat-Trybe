const socket = io();
const ulMensagens = document.getElementById('message');
const form = document.getElementById('form');
const inputEnviar = document.getElementById('enviar');
const inputNickname = document.getElementById('nickname');
const usersOnline = document.getElementById('usersOnline');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputEnviar.value) {
    socket.emit('message', {
      chatMessage: inputEnviar.value,
      nickname: inputNickname.value,
    });

    inputEnviar.value = '';
  }
});

socket.on('message', (message) => {
  const liMessages = document.createElement('li');
  liMessages.setAttribute('data-testid', 'message');
  liMessages.innerText = message;
  ulMensagens.appendChild(liMessages);

  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('usuario', (data) => {
  const liMessages = document.createElement('li');
  liMessages.setAttribute('class', 'user-online');
  liMessages.innerText = data;
  usersOnline.appendChild(liMessages);
  console.log(data);
});

/** @source https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript */
function makeid(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

inputNickname.value = makeid(16);
socket.emit('usuario', { nickname: inputNickname.value });

inputNickname.addEventListener('change', () => {
  console.log('nick alterado');
});