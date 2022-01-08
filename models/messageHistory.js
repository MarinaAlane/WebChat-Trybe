const conn = require('./connection');

module.exports = {
  createMessage: async (msg) => {
    const db = await conn();
    return db.collection('messages').insertOne(msg);
  },
};
