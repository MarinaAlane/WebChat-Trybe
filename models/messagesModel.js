const connect = require('./connection');

module.exports = {
  create: async (message) => {
    const db = await connect();
    const collection = db.collection('messages');
    await collection.insertOne({ ...message });
  },

  getAll: async () => {
    const db = await connect();
    const collection = db.collection('messages');
    const messages = await collection.find().toArray();
    return messages;
  },
};
