const socket = window.io(); // chama o método io do socket
const userConnect = document.getElementById('users'); // acessando o elemento pelo id no HTML
const formMessages = document.getElementById('form'); // acessando o elemento pelo id no HTML
const messagesUsers = document.getElementById('messages'); // acessando o elemento pelo id no HTML
const messageBox = document.getElementById('message-box'); // acessando o elemento pelo id no HTML
const nicknameBox = document.getElementById('nickname-box'); // acessando o elemento pelo id no HTML
const saveNickname = document.getElementById('nickname-button'); // acessando o elemento pelo id no HTML

let nickname = ''; // o nome do usuário é iniciado vazio

formMessages.addEventListener('submit', (event) => { // Req. 1 - Emite o evento mensagem com os dados do nickname e a chatMessage preenchida no campo
  event.preventDefault();
  socket.emit('message', {
    nickname,
    chatMessage: messageBox.value,
  });
  messageBox.value = ''; // após enviar uma mensagem, o o campo messageBox será setado para uma string vazia
});

saveNickname.addEventListener('click', (event) => { // Req. 2 - permite salvar o nickname do usuário 
  event.preventDefault(); // esse evento serve para não recarregar a página ao disparar o botão
  nickname = nicknameBox.value; // o valor digitado será capturado na tela
  nicknameBox.value = ''; // após digitar o nickname, e clicar no botão, ele voltará a ser vazio
  socket.emit('saveNickname', nickname); // o nome digitado será enviado ao back end
});

const createMessages = (message) => { // Req. 1 e 2 - Criada a mensagem na tela e armazenada numa "li"
  const li = document.createElement('li'); // criou a tag "li"
  li.innerText = message; // pegando a mensagem digitada pelo usuário
  li.setAttribute('data-testid', 'message'); // setando atributos
  messagesUsers.appendChild(li); // adicionando no HTML
};

const getMessages = (messages) => { // Req. 3 - pega as mensagens criadas no banco
  messages.forEach((message) => { // para cada mensagem no banco
    createMessages(
      `${message.timestamp} - ${message.nickname}: ${message.message}`, // será criada na tela com os campos: "message", "nickname", "timestamp"
    );
  });
};

const userCreated = (newId) => { // Req. 2 - cria o usuário no chat, conforme o id gerado com 16 caracteres
  nickname = newId; // o nickname é o id que foi gerado com 16 caracteres
  socket.emit('usersOnline'); // Req. 4 - enviando para o backend os usuários que estão online
};

const updateUsers = (user) => { // Req. 4 - função que atualiza os usuários
  const li = document.createElement('li'); // cria o elemento com a "li"
  li.innerText = user.nickname; // cada usuário irá aparecer na "li" criada
  li.setAttribute('data-testid', 'online-user'); // será setado no data-testid "online user"
  userConnect.appendChild(li); // adicionando no HTML
};

const getUsersOnline = (users) => { // Req. 4 - lista os clientes conectados no momento
  userConnect.innerHTML = ''; // enquanto não houver um novo usuário, a tag "users" será vazia
  const user = users.find((item) => item.id === socket.id); // vai procurar o usuário conectado e comparar o id com o id do socket
  updateUsers(user); // sendo o id correspondente, atualiza a tag com o nome do usuário
  users.forEach((item) => item.id !== socket.id && updateUsers(item)); // se o usuário já foi atualizado, ele não irá atualizar com o nome já preenchido
};

socket.on('message', createMessages); // Req.1 - ouvindo o evento message e executando a função createMessages
socket.on('newUser', userCreated); // Req. 2 - ouvindo os novos usuários que entraram no chat, executando a função userCreated
socket.on('allMessages', getMessages); // Req. 3 - ouvindo as mensagens do chat e executando a função getMessages
socket.on('usersOnline', getUsersOnline); // Req. 4 - ouvindo os usuários que estão online e executando a função que pega todos os usuários online no momento
