const connection = require('./connection');

const create = async (message) => {
  const newMessage = await connection()
    .then((db) => db.collection('messages').insertOne({ ...message }));
    
  return newMessage;
};

module.exports = {
  create,
};
