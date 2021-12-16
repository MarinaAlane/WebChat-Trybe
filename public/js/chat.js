const socket = window.io();
/* 
window.io() , isso serve para enfatizar que a função io é uma função injetada ao objeto window do DOM da página. Dessa forma, conseguimos seguir utilizando nosso socket, mas agora em um arquivo separado 
*/
const DATA_TEST = 'data-testid';

const formMessage = document.getElementById('messageForm');
const inputMessage = document.getElementById('messageInput');

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { 
    chatMessage: inputMessage.value, 
    nickname: sessionStorage.getItem('user'),
  });
  inputMessage.value = '';
  return false;
});

const userForm = document.getElementById('userForm');
const userInput = document.getElementById('userInput');
const nickName = document.getElementById('nickName');

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(userInput.value);
  socket.emit('changeUser', { // req 4
    newUser: userInput.value, 
    oldUser: nickName.innerHTML,
  });
  sessionStorage.setItem('user', userInput.value);
  nickName.innerText = sessionStorage.getItem('user');
  userInput.value = '';
  return false;
});

/* 
Esse trecho de código determina que ao clicar no botão submit do formulário, 
será enviado um evento message com a mensagem preenchida, e o usuário 
*/

function createMessage(message) {
  const messagesUl = document.getElementById('messages');
  const li = document.createElement('li');
  li.setAttribute(DATA_TEST, 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
}

/*
Função createMessage - busca a ul messages via document 
- cria um li - coloca dentro dessa li a messagem que veio por paramentro 
- coloca essa li dentro da ul
*/

function createUser(user) {
  const userUl = document.getElementById('users');
  const li = document.createElement('li');
  li.setAttribute(DATA_TEST, 'online-user');
  li.innerText = user.nickname;
  userUl.appendChild(li);
}

/*
Função createUser - busca a userUl messages via document 
- cria um li
- seta o atributo para os tests 
- coloca dentro dessa li o usuário que veio por paramentro 
- coloca essa li dentro da ul
*/

function clearUserList() {
  const userUl = document.getElementById('users');
  const newUl = userUl.cloneNode(false);
  userUl.parentNode.replaceChild(newUl, userUl);
}

/*
Função clearUserList 
- busca a userUl via document
- usando o metodo cloneNode [duplica um elemento node (nó) da estrutura de um documento DOM. 
  Ele retorna um clone do elemento para o qual foi invocado.] clona essa ul e como foi passado o paramentro false para esse metodo de clonar apenas o nó específico dispensando, assim, 
  qualquer elemento DOM filho. Veja os exemplos abaixo.
- depois usando o parentNode.replaceChild Substitui o elemento filho especificado por outro.
Exemplo: replacedNode = parentNode.replaceChild(newChild, oldChild);
- newChild é o novo elemento que será inserido no lugar do oldChild. Se já existir 
  no DOM, será   removido primeiro para depois ser inserido.
- oldChild é o elemento existente que será substituído.
replacedNode é elemento substituído. É o mesmo elemento que oldChild.
*/

function updateUserList(users) {
  clearUserList();
  const userUl = document.getElementById('users');
  users.forEach((item) => {
    if (item.nickname !== nickName.innerText) {
      createUser(item);
    }
  });
  const li = document.createElement('li');
  li.setAttribute(DATA_TEST, 'online-user');
  li.innerText = nickName.innerText;
  userUl.insertBefore(li, userUl.firstChild);
}

/*
Função updateUserList - atualiza a lista para atender aos requisito 3
- primeiro ele usa a função clearUserList criada anteriormente para limpar os usuários 
que estao na userUl
- depois busca a userUl via document 
- e percorre o array de usuários procurando para ver se é o usuário caso não seja ele 
  ele o  cria usando a função createUser 
- cria uma li
- seta o atributo para o teste teste
- coloca o valor na nova li
- por fim insere antes essa li antes do primeiro do primeiro elemento dentro de userUl
[
  exemplo: elementoPai.insertBefore(novoElemento, elementoDeReferencia);
  - elementoPai Pai do nó recentemente inserido.
  - novoElemento O nó a ser inserido.
  - elementoDeReferencia O nó antes do qual o novoElemento será inserido.
]
*/

socket.on('user', (id) => {
  sessionStorage.setItem('user', id);
  nickName.innerText = sessionStorage.getItem('user');
});

socket.on('message', (message) => createMessage(message));

socket.on('userList', (users) => {
  console.log(users);
  updateUserList(users);
});

window.onbeforeunload = function disconect() {
  socket.disconnect();
};

/*
quando o evento 'message' for recebido vamos chamar a função createMessage passando a mensagem como parametro
o socket.on:
Identifica o socket emit do Back pelo parametro 'user' e 'message' e  na callback recebe o parametro especifico: 
*/
