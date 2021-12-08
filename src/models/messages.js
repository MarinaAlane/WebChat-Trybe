const connection = require('./connection');

const getAll = () =>
  connection()
    .then((db) => db.collection('messages').find().toArray())
    .catch((err) => err);

const saveMsg = ({ message, nickname, timestamp }) =>
  connection().then((db) =>
    db
      .collection('messages')
      .insertOne({ message, nickname, timestamp })
      .catch((err) => err));

module.exports = {
  saveMsg,
  getAll,
};
