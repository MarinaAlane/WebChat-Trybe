const connection = require('./connection');

const setMessage = async (msg) => {
    const db = await connection();
    await db.collection('messages').insertOne(msg);
};

const getMessages = async () => {
    const db = await connection();
    const messages = await db.collection('messages').find({}).toArray();
    return messages;
};

module.exports = {
    setMessage,
    getMessages,
};