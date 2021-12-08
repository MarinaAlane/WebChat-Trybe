const connection = require('./connection');

async function insertMessage() {
  const connect = await connection();
  const db = await connect.collection('message');
  const result = await db.find({}, {
    projection: {
      _id: 0,
    },
  }).toArray();
  return result;
}

module.exports = insertMessage;
