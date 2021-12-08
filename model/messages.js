const connection = require('../connection');

const create = async (message, nickname, timestamp) => {
  const messageData = {
    message, nickname, timestamp,
  };

  await connection()
    .then((db) => db.collection('messages').insertOne(messageData));
};

module.exports = {
  create,
};