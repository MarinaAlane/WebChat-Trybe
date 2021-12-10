const moment = require('moment');
/* refatorado usando moment() - https://momentjs.com/ */
const curretTime = moment().format('MM-DD-YYYY h:mm:ss');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected!`);
  // logica do 'randomNickname' feito com auxilio da Islene e Marcelo Leite
  const randomNickname = socket.id.slice(0, 16);
  socket.emit('userLogged', randomNickname); 
  // escutando o chat
  socket.on('message', ({ nickname, chatMessage }) => {    
    const data = `${curretTime} - ${nickname}: ${chatMessage}`;
    // enviar mensagem para todos
    io.emit('message', `${data}`);
  });
  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} desconectado`);
  });
});

/* 
Obter e mostrar data e hora sites pesquisados:
https://codare.aurelio.net/2009/04/03/javascript-obter-e-mostrar-data-e-hora/#:~:text=Para%20obter%20a%20data%20(e,uma%20vari%C3%A1vel%20var%20dia%20%3D%20data. 

https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date

https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
*/
