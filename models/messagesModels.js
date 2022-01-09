const connection = require('./connection');

const getAll = async () => {
  const response = await connection().then((db) => db.collection('messages').find({}).toArray());
  return response;
};

const messagesModel = async (message) => {
  const response = await connection().then((db) => db.collection('messages').insertOne(message));
  return response;
};

module.exports = {
  getAll,
  messagesModel,
};