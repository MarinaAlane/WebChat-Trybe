const connection = require('./connection');

const messageRegister = async (message, nickname, timestamp) => {
  try {
    const db = await connection();
    const register = await db.collection('messages').insertOne({ message, nickname, timestamp },
      { projection: { _id: 0 } });
    return ({ _id: register.insertedId, message, nickname, timestamp });
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
