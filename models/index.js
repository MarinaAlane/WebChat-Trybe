const connection = require('./connection');

const createMsg = async (payload) => {
  const cnt = await connection();
  
  await cnt.collection('messages').insertOne({
    ...payload,
  });
};

const getAllMsgs = async () => {
  const cnt = await connection();
  const msgArray = await cnt.collection('messages').find().toArray();

  return msgArray;
};

module.exports = {
  createMsg,
  getAllMsgs,
};
