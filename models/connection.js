const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// prettier-ignore
module.exports = async () =>
  MongoClient.connect(process.env.DB_URL, OPTIONS).then((client) =>
    client.db(process.env.DB_NAME));
