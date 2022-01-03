const conn = require('./connection');

const addMsg = async (message) => {
  const addingNewMsg = await conn()
    .then((db) => db.collection('messages').insertOne({ ...message }));
  return addingNewMsg;
};

const getAll = async () => {
  const all = await conn()
    .then((db) => db.collection('messages').find().toArray());
  return all;
};

module.exports = { addMsg, getAll };