const connection = require('./connection');

module.exports = {
  create: async (message) => {
    const db = await connection();
    await db.collection('messages').insertOne(message);
  },

  getAll: async () => {
    const db = await connection();
    const getMessages = db.collection('messages').find().toArray();
    return getMessages;
  },
};
