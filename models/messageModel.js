const connection = require('./connection');

const saveMessage = async (message) => {
  try {
    const getConnection = await connection()
      .then((db) => db.collection('messages'));
    await getConnection.insertOne(message);
    return { code: 201 };
  } catch (error) {
    return error.code;
  }
};

const getAll = async () => {
  try {
    const getConnection = await connection()
      .then((db) => db.collection('messages'));
    const messages = await getConnection.findAll().toArray();
    return { code: 200, result: messages };
  } catch (error) {
    return error.code;
  }
};

module.exports = {
  saveMessage,
  getAll,
};