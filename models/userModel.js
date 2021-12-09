const connection = require('./connection');

const create = async (message) => {
    const date = new Date();
    const dado = { message: message.chatMessage, nickname: message.nickname, timestamp: date };
    const db = await connection();
    const result = await db.collection('messages').insertOne(dado);
    return result;
};

const getAll = async () => {
    const db = await connection();
    const result = await db.collection('messages').find().toArray();
    return result;
};

module.exports = {
    create,
    getAll,
};