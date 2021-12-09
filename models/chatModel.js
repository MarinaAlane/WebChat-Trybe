const connect = require('./connection');

// ROTA GET
const getMessagesHistory = async () => {
  const db = await connect();
  const history = await db.collection('messages').find({}).toArray();
  return history;
};

// ROTA POST
const postMessage = async (message, nickname, timestamp) => {
  const db = await connect();
 await db.collection('messages').insertOne({ message, nickname, timestamp }); 
};

module.exports = {
  postMessage,
  getMessagesHistory,
};
