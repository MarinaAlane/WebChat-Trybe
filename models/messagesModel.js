const connection = require('./connection');

const getAll = () => connection().then((db) => db.collection('messages').find().toArray());

const createMessage = ({ timestamp, nickname, message }) => {
  // console.log(timestamp, nickname, message);
  connection().then((db) => {
    db.collection('messages').insertOne({ timestamp, nickname, message });
  });
};

module.exports = { getAll, createMessage };