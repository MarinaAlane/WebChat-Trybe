module.exports = (io) => io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected!`);
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date();
    // mes + 1 -> para o mês de Janeiro não iniciar com zero.
    const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const currentHour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    // padrao do formato da mensagem: DD-MM-yyyy HH:mm:ss ${nickname} ${chatMessage}
    const data = `${currentDate} ${currentHour} - ${nickname}: ${chatMessage}`;
    
    // enviar mensagem para todos
    io.emit('message', `${data}`);
  });
  socket.on('disconnect', () => {
    console.log(`User  ${socket.id} disconnected`);
  });
});

/* 
Obter e mostrar data e hora sites pesquisados:
https://codare.aurelio.net/2009/04/03/javascript-obter-e-mostrar-data-e-hora/#:~:text=Para%20obter%20a%20data%20(e,uma%20vari%C3%A1vel%20var%20dia%20%3D%20data. 

https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date

https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
*/
