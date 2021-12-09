const connect = require('./connection');

const create = (content) => connect()
  .then((db) => {
    db.collection('messages').insertOne(content);
  });

const getAll = () => connect()
  .then((db) => db.collection('messages').find().toArray());

module.exports = {
  create,
  getAll,
};
