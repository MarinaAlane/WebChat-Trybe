const connection = require('./connection');

const sendMsgDb = async ({ timestamp, nickname, chatMessage }) => {
  const db = await connection();
  
  const send = await db.collection('messages')
    .insertOne({ timestamp, nickname, chatMessage });
  
    return send;
};

const getMsgDb = async () => {
  const db = await connection();
  
  const receive = await db.collection('messages')
    .find().toArray();
  
  return receive;
};

module.exports = {
  sendMsgDb,
  getMsgDb,
};
