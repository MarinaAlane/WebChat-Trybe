const connection = require('./connection');

const saveMessage = async (message, nickname, timestamp) => {
  connection().then((db) =>
    db.collection('messages').insertOne({
      message,
      nickname,
      timestamp,
    }));
};

const getMessages = async () => {
  try {
    const db = await connection();
    return db.collection('messages').find().toArray();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { saveMessage, getMessages };
