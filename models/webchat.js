const connection = require('./connection');

const getMessages = async () => {
  try {
    const db = await connection();
    return await db.collection('messages').find({}).toArray();
  } catch (error) {
    console.error(error);
  }
};

const createMessage = async (message) => {
  try {
    const db = await connection();
    return await db.collection('messages').insertOne(message);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getMessages,
  createMessage,
};
