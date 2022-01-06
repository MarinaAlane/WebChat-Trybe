const conexao = require('./connection');

const sendMessageToDB = async ({ timeLog, nickname, chatMessage }) => {
  const db = await conexao();
  const enviar = await db.collection('messages').insertOne({ timeLog, nickname, chatMessage });
  return enviar;
};
const getMessageFromDB = async () => {
  const db = await conexao();
  const receber = await db.collection('messages').find().toArray();
  return receber;
};

module.exports = {
  sendMessageToDB,
  getMessageFromDB,
};
