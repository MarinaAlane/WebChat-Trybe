const moment = require('moment');
const connection = require('./connection');

const createMessage = async ({ chatMessage, nickname }) => {
  const db = await connection();
  const timestamp = moment().format('DD-MM-yyyy LTS');
  await db.collection('messages').insertOne({ timestamp, nickname, chatMessage });
  return `${timestamp} - ${nickname}: ${chatMessage}`;
};

const getAllMessage = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

module.exports = { createMessage, getAllMessage }; 