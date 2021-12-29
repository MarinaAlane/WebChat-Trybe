const { MongoClient } = require('mongodb');
require('dotenv').config();

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/webchat/';
const DB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
const DB_NAME = process.env.DB_NAME || 'webchat';

let schema = null;

async function connection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient
    .connect(DB_URL, DB_OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    });
}

module.exports = connection;
