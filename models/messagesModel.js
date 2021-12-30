const connection = require('./connection');

const getAll = async () => {
    const db = await connection();
    const list = await db.collection('messages').find().toArray();
    return list;
};

const createMessage = async (message, timestamp, nickname) => {
    const db = await connection();
    const result = await db.collection('messages')
        .insertOne({ message, nickname, timestamp });
    return result;
};

module.exports = {
    getAll,
    createMessage,
};
