const mongoConnection = require('./connection'); // import da função connection para configuração do mongo

async function saveMessages(nickname, message, timestamp) {
  const db = await mongoConnection();
  await db.collection('messages').insertOne({ nickname, message, timestamp });
}

/*
função para salvar as mensagens no banco de dados recebe o nickname do usuário para
mensagem e timestamp como pedido no requisito e os insere no banco
*/

async function getMessages() {
  const db = await mongoConnection();
  const msg = await db.collection('messages').find().toArray();
  return msg;
}

/*
Função para buscar as mensagens salvas no banco de dados
*/

module.exports = {
  saveMessages,
  getMessages,
};