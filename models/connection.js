const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = process.env.DB_URL;
const { DB_NAME } = process.env;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let schema = null;

const connection = () => (schema ? Promise.resolve(schema)
 : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
    schema = conn.db(DB_NAME);
    return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    }));

module.exports = connection;
