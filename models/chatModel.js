const connection = require('./connection');

const COLLECTION = 'messages';

const create = async ({ chatMessage, nickname, messageDate }) => {
  const db = await connection();
  const message = await db.collection(COLLECTION).insertOne({
    message: chatMessage,
    nickname,
    timestamp: messageDate,
}); 
  return message;
};

const getAll = async () => {
  const db = await connection();
  const messages = await db.collection(COLLECTION).find().toArray();
  return messages;
};

module.exports = {
  create,
  getAll,
};