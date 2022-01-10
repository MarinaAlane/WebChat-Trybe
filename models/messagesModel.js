const connection = require('./connection');

async function getAll() {
    return connection()
    .then(async (db) => {
      const messages = await db.collection('messages')
      .find().toArray();

      return messages;
    });
  }

module.exports = { getAll };