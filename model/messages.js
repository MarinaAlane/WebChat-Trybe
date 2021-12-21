const connection = require('../connection/connection');

const getAllMessages = async () => {
  const response = await connection()
    .then((db) => db.collection('messages').find().toArray());
    return response;
};

const create = async (message, nickname, timestamp) => {
  await connection().then((db) => {
    db.collection('messages').insertOne({ message, nickname, timestamp });
  });
};

module.exports = {
  getAllMessages,
  create,
};