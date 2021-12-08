const connection = require('./connection');
const time = require('../middleware/getTime');

async function insertMessage(message) {
  try {
    const connDb = await connection();
    const db = await connDb.collection('message');

    const { ops } = await db.insertOne({
      timestamp: time,
      nickname: message.nickname,
      message: message.chatMessage,
    });

    return ops[0];
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = insertMessage;
