const socket = window.io();

const form = document.querySelector('#form');
const ulZoeiro = document.querySelector('#zoeiros');
const ulZoeira = document.querySelector('#zoeiras');
const inputZoeiro = document.querySelector('#nickname-box');
const inputZoeira = document.querySelector('#message-box');
const zoeiroBtn = document.querySelector('#nickname-button');

let zoeiro = '';

form.addEventListener('submit', (event) => {
  event.preventDefault();

  socket.emit('zoeira', {
    zoeiro,
    zoeira: inputZoeira.value,
  });
  
  inputZoeira.value = '';
});

zoeiroBtn.addEventListener('click', () => {
  zoeiro = inputZoeiro.value;
  inputZoeiro.value = '';

  socket.emit('saveZoeiro', zoeiro);
});

const createZoeira = (zoeira) => {
  const li = document.createElement('li');
  li.innerText = zoeira;

  li.setAttribute('data-testid', 'message');
  ulZoeira.appendChild(li);
};

const createZoeiro = (newZoeiro) => {
  zoeiro = newZoeiro;

  socket.emit('zoeirosOnline');
};

const setZoeirosList = (zoeiroList) => {
  ulZoeiro.innerHTML = '';

  const clientZoeiro = zoeiroList.find((zoador) => zoador.id === socket.id);

  const li = document.createElement('li');
  li.innerText = clientZoeiro.zoeiro;

  li.setAttribute('data-testid', 'online-user');
  
  ulZoeiro.appendChild(li);
};

const getAllZoeiras = (zoeiras) => {
  zoeiras.forEach((zoeira) => {
    createZoeira(
      `${zoeira.timestamp} - ${zoeira.nickname}: ${zoeira.message}`,
    );
  });
};

socket.on('zoeira', createZoeira);
socket.on('newZoeiro', createZoeiro);
socket.on('zoeirosOnline', setZoeirosList);
socket.on('getZoeiras', getAllZoeiras);
