const connection = require('./connection');

async function getMessages() {
  const connect = await connection();
  const db = await connect.collection('messages');
  const result = await db.find({}, {
    projection: {
      _id: 0,
    },
  }).toArray();
  return result;
}

module.exports = getMessages;
