const connection = require('./connection');

const messageRegister = async (message, nickname, timestamp) => {
  try {
    const db = connection();
    const register = await db.collection('messages').insertOne({ nickname, message, timestamp });
    return ({ nickname, message, timestamp, _id: register.insertedId });
  } catch (_err) {
      return ({ code: 'databaseError' });
  }
};

module.exports = {
  messageRegister,
};
