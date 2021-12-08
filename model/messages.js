const connection = require('../connection/connection');

const getAll = async () => {
  const response = await connection()
    .then((db) => db.collection('messages').find().toArray());
    return response;
};

const create = async (message, nickname, timestamp) => {
  await connection().then((db) => {
    db.collection('messages').insertOne({ message, nickname, timestamp });
  });
  // return { message, nickname, timestamp };
};

module.exports = {
  getAll,
  create,
};