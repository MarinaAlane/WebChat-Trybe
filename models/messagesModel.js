const connection = require('./connection');

// Lógica construída com a ajuda do aluno Luiz Wendel - Turma 11
const createMessage = async ({ message, nickname, timestamp }) => {
  const db = await connection();
    await db.collection('messages').insertOne({ message, nickname, timestamp });
};

const getAllMessages = async () => {
  const allMessages = connection()
    .then((db) => db.collection('messages').find().toArray())
    .then((result) => result);

    return allMessages;
};

module.exports = {
  createMessage,
  getAllMessages,
};
