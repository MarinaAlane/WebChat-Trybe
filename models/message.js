const connection = require('./connection');

  const getAll = async () => {
    const db = await connection();
    const msg = await db.collection('messages').find({}).toArray();
    return msg;
  };
  
 const saveHistory = async (msg) => {
  const db = await connection();
  const messages = await db.collection('messages').insertOne(msg);
  return messages;
};

module.exports = {
  getAll,
  saveHistory,
};
