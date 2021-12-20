const { saveMessages } = require('../controllers/chatController'); // importação da função saveMessages 

function setMessage({ nickname, chatMessage }, date) {
  return `${date} - ${nickname} - ${chatMessage}`;
}

/*
Função setMessage - recebe como paramentro e
seta a mensagem como deve ser no caso data - nome - mensagem
*/

let arrayUsers = [];

function changeUser(users) {
  arrayUsers = arrayUsers.map((item) => {
    if (item.nickname === users.oldUser) {
      return { nickname: users.newUser, id: item.id };
    }
    return item;
  });
}

/*
Função changeUser - 
recebe os usuarios em um objeto contendo o oldUser e o newUser
fazendo um map verifica se o usuario sendo mapeado é igual ao usuario antigo
caso for ele retorna um novo objeto contendo o novo usuaário e o id o item
caso contreario ele retorna o item antigo
*/

function setDefaultMsg(message) {
  const date = new Date().toLocaleString().replace(/\//gi, '-');
  saveMessages(message, date);
  const formatMsg = setMessage(message, date);
  return formatMsg;
}

/*
Função setDefaultMsg -> criar a messagem padrão que deve conter a Data o usuário e a mensagem padrão
- Recebe como paramentro um objeto contendo o usuário e a mensagem.
- usa o date para pegar a data o toLocaleString para buscar somente a data e hora e o replace + 
regex para substituir as barras por traços como pedido no reuqisito
- chama a função setMessage para configurara a mensagem
- retorna a mensagem formatada de acordo com o requisito 1
*/

module.exports = (io) => io.on('connection', (socket) => { // 1
  socket.emit('user', socket.id.slice(0, 16)); // 3
  arrayUsers.push({
    id: socket.id,
    nickname: socket.id.slice(0, 16),
  });

  io.emit('userList', arrayUsers); // 5

  socket.on('message', (msg) => { // 2
    const newMessage = setDefaultMsg(msg);
    io.emit('message', newMessage); // 4 
  });
  
  socket.on('changeUser', (nicknames) => { // 6
    changeUser(nicknames);
    io.emit('userList', arrayUsers);
  });

  socket.on('disconnect', () => { // 7
    arrayUsers = arrayUsers.filter((item) => item.id !== socket.id);
    socket.broadcast.emit('userList', arrayUsers);
  });
});

/*
1- Essa função vai ser executada sempre que um novo client se conectar ao servidor
Dentro dessa função passamos um segundo parâmetro que é um callback com um parâmetro user
Este parâmetro é a representação de uma conexão aberta ao socket-io rodando no nosso back-end
No objeto socket temos um atributo id que é uma string aleatória que é gerada a cada nova conexão
*/

/*
2- A função socket.on() cria um listener , ou seja, uma forma de detectar quando algum cliente emitir 
um evento personalizado para o servidor. No caso, criamos um listener para o evento message. Podemos fazer 
um paralelo da função socket.on com a função document.addEventLintener que faz o registro de um listener 
de eventos do DOM como o clique em um botão ou ao digitar algo em uma caixa de texto.
*/

/*
3- Usamos uma string para enviar uma mensagem, mas podemos usar outros tipos de dados, como um número, 
uma data, um objeto, entre outros tipos, neste caso estamos emitindo 
o id do usuário com 16 caracteres usando a função slice(0, 16)
*/

/*
4- dentro do listener do evento , usamos a função io.emit , em vez de socket.emit para enviar a mensagem ja formatada com a data/hora o usuário e a mensagem que é feito pela função defaultMessage 

*/

/* 
5- emite o array de usuários que foi montado aqui pela função change users
*/

/*
6- socket changeuser recebe o aray de nickname chama a função change user e emit o array de usuarios  
*/

/*
7- quando um usuario se disconecta ele retira esse usuario do array de usuarios e emite a nova lista para todos os clientes com o socket.broadcast.emit 
*/
