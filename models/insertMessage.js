const connection = require('./connection');

async function insertMessage(message) {
  try {
    const connDb = await connection();
    const db = await connDb.collection('message');

    const { ops } = await db.insertOne(message);

    return ops[0];
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = insertMessage;
