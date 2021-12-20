const connection = require('./connection');

const COLLECTION_NAME = 'users';

const insert = async ({ nickname, id }) => {
  const db = await connection();
  const collection = await db.collection(COLLECTION_NAME);

  await collection.insertOne({ nickname, _id: id });
};

module.exports = {
  insert,
};
