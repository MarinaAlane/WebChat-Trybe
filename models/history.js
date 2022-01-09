const connection = require('./connection');

const historyMessages = async () => {
  const dataBase = await connection();

  const history = await dataBase.collection('messages').find({}).toArray();

  return history;
};

const send = async (message) => {
  const dataBase = await connection();

  const sentMessage = await dataBase.collection('messages').insertOne(message);

  return sentMessage;
};

module.exports = {
  historyMessages,
  send,
};