const connection = require('./connection');

const saveMessage = async (data) => {
  const db = await connection();
  // console.log({ data });
  const response = await db.collection('messages').insertOne(data);
  return response;
};

const getAll = async () => {
  const db = await connection();
  const response = await db.collection('messages').find().toArray();
  // console.log({ response });
  return response;
};

module.exports = {
  saveMessage,
  getAll,
}; 