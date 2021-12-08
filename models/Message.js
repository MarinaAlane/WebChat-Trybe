const connect = require('./connection');

module.exports = {
  create: async (message) => {
    const db = await connect();
    const messagesCollection = db.collection('messages');

    await messagesCollection.insertOne({ ...message });
  },

  getAll: async () => {
    const db = await connect();
    const messagesCollection = db.collection('messages');

    const messages = await messagesCollection.find().toArray();

    return messages;
  },
};
