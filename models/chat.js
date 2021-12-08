const connection = require('./connection');

const getAll = () => (
  connection().then((db) => db.collection('messages').find({}).toArray())
);

const saveMessage = async (itens) => (
  connection()
    .then((db) => db.collection('messages')
      .insertOne({ ...itens, timestamp: new Date() }))
);

module.exports = {
  getAll,
  saveMessage,
};

// {
//   message: 'Lorem ipsum',
//   nickname: 'xablau',
//   timestamp: '2021-04-01 12:00:00'
// }
