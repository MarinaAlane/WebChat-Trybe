const connection = require('./connection');

const messageRegister = async (message, nickname, timestamp) => {
  try {
    const db = await connection();
    const register = await db.collection('messages').insertOne({ nickname, message, timestamp });
    console.log(register);
    return ({ nickname, message, timestamp, _id: register.insertedId });
  } catch (_err) {
      return ({ code: 'databaseError' });
  }
};

const getAllMessage = async () => {
  try {
    const db = await connection();
    return db.collection('messages').find().toArray();
  } catch (_err) {
    return ({ code: 'databaseError' });
  }
};

module.exports = {
  messageRegister,
  getAllMessage,
};
