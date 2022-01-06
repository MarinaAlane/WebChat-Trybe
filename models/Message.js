const connect = require('./connection');

const create = async (message) => {
  const db = await connect();
  const messagesCollection = db.collection('messages');

  await messagesCollection.insertOne({ ...message });
};

const getAll = async () => {
  const db = await connect();
  const messagesCollection = db.collection('messages');

  const messages = await messagesCollection.find().toArray();

  return messages;
};

module.exports = { create, getAll };