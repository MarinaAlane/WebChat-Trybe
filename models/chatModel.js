const connection = require('./connection');

const createZoeiras = async (zoeira) => {
  const db = await connection();

  await db.collection('messages').insertOne(zoeira);
};

const getAllZoeiras = async () => {
  const db = await connection();
  const zoeiras = await db.collection('messages').find().toArray();

  return zoeiras;
};

module.exports = { 
  createZoeiras,
  getAllZoeiras,
};
