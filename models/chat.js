const connection = require('./connection');

const getMessages = async () => {
    const db = await connection();
    return db.collection('messages').find({}).toArray();
};

const createMessage = async (message) => {
    const db = await connection();
    return db.collection('messages').insertOne(message);
};

module.exports = { getMessages, createMessage };