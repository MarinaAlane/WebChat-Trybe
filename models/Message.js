const connect = require('./connection');

module.exports = {
  create: async (message) => {
    const db = await connect();
    const messagesCollection = db.collection('messages');

    await messagesCollection.insertOne({ ...message });
  },
};
