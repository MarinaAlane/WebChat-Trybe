const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;
const appServer = http.createServer(app);
const io = new Server(appServer);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`Usuário ${socket.id} conectado`);
/*
  A função Date aprendi com o colega Alberto Candito
  https://github.com/tryber/sd-011-project-webchat/pull/45
  A variavel data message recebe um obj. do tipo date que é passível de ser
  manipulado pelas funções toLocaleDataString e toLocaleTimeString. Na linha
  23 o uso do replace procura, atraves de um regex, por ocorrencias na string desejada
  e substitui pelo sinal '-'. Na linha 24 o objeto entre parenteses seta o horario
  utilizado como padrão de 12 horas e mostra AM ou PM para definir o período do dia
   */
  const dataMessage = new Date();
  const onlyDate = dataMessage.toLocaleDateString('pt-BR').replace(/\//g, '-');
  const onlyTime = dataMessage.toLocaleTimeString('pt-BR', { hour12: true });
  console.log(onlyDate, onlyTime);

  console.log(dataMessage);

  socket.on('message', (msg) => {
    io.emit('message', `${onlyDate} ${onlyTime} - ${msg.nickname}: ${msg.chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} desconectou`);
  });
});

appServer.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));