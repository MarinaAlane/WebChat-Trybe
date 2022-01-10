const { connection } = require('./connection');

const getDateAndTime = () => {
  const date = new Date();
  const currentDate = date.toLocaleDateString('pt-BR').replace(/\//g, '-');
  const currentHour = date.toLocaleTimeString('pt-BR', { hour12: true });
  return `${currentDate} ${currentHour}`;
  };

const getDatabase = async () => {
  const data = await connection();
  const db = await data;
  const collection = await db.collection('messages');
  return collection;
};

const addMessage = async ({ message, nickname }) => {
  const db = await getDatabase();

  await db.insertOne({ nickname, message, timestamp: getDateAndTime() });
};

const getMessages = async () => {
  const db = await getDatabase();

  return db.find().toArray();
};

module.exports = {
  addMessage,
  getMessages,
};