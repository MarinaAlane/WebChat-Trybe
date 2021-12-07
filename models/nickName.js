const connection = require('./connection');

const createUser = async (user) => {
    const db = await connection();
    const createdUser = await db.collection('users').insertOne({
      user,
    });
    return createdUser;
};

module.exports = {
  createUser,
};