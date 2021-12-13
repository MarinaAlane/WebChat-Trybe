function defaultMessage(messageObj) { 
  const { user, sendMessage } = messageObj;
  const date = new Date();
  return `${date} - ${user}: ${sendMessage}`;
}

/*
Função defaultMessage -> criar a messagem padrão que deve conter a Data o usuário e a mensagem padrão
- Recebe como paramentro um objeto contendo o usuário e a mensagem.
- usa o date para pegar a data 
- retorna a mensagem formatada 
*/

module.exports = (io) => io.on('connection', (socket) => {
  io.on('conection', (user) => { // 1
    socket.emit('user', `${user.id.slice(0, 16)}`); // 3
  });
  
  socket.on('message', (msg) => { // 2
    console.log(`Message: ${msg}`);
    const newMessage = defaultMessage(msg);
    io.emit('message', newMessage); // 4
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
3- Usamos uma string para enviar uma mensagem, mas podemos usar outros tipos de dados, como um número, uma data,
 um objeto, entre outros tipos, neste caso estamos emitindo o id do usuário 
*/

/*
4- dentro do listener do evento , usamos a função io.emit , em vez de socket.emit
*/