const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let schema = null;

// ..Source: https://github.com/tryber/sd-011-cookmaster/blob/monts-draft-cookmaster/src/api/connection.js
const connection = () => (
  schema
  ? Promise.resolve(schema)
  : MongoClient.connect(process.env.DB_URL, OPTIONS)
    .then((conn) => {
      schema = conn.db(process.env.DB_NAME);
      return schema;
    })
);

module.exports = connection;
