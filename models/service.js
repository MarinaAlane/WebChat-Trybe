const connection = require('./connection');

const getAllMessages = () => connection().then((db) => db.collocation('chat').find().toArray());

module.exports = {
  getAllMessages,
};