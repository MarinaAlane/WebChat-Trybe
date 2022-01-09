const connection = require('./connection');

const getAllMessages = async () => connection().then((db) => db.collection('messages')
    .find().toArray());

const createMessage = async (message) => {
    const messages = await connection().then((db) => db.collection('messages'));
    await messages.insertOne(message);
};

module.exports = {
    getAllMessages,
    createMessage,
};
