const connection = require('./connection');

const newMessage = async ({ nickname, message, timeStamps }) => {
  const db = await connection();
  await db.collection('messages').insertOne({
    message,
    nickname,
    timeStamps,
  });
};

const historyMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find({}).toArray();
  return messages;
};

module.exports = {
  newMessage,
  historyMessages,
};
