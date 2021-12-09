require('dotenv').config({ path: '../../../.env' });

const { MongoClient } = require('mongodb');

let schema = null;

const { DB_URL, DB_NAME } = process.env;

async function connection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient
    .connect(
      DB_URL,
      {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      },
    )
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    });
}

module.exports = connection;