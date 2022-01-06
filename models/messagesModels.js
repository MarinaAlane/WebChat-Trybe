const connection = require('./connection');

const createMessages = async (nickname, chatMessage, timestamp) => { // Req. 3 - Cria as mensagens no banco de dados
  const db = await connection();
  await db.collection('messages').insertOne({ nickname, message: chatMessage, timestamp });
};

const getAllMessages = async () => { // Req. 3 - Mostra todas as mensagens armazenadas no banco
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

module.exports = {
  createMessages,
  getAllMessages,
};
