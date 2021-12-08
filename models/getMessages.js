const connection = require('./connection');

async function getMessages() {
  try {
    const connDb = await connection();
    const db = await connDb.collection('message');

    const result = await db.find({}, {
      projection: { _id: 0 },
    }).toArray();

    return result;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = getMessages;
