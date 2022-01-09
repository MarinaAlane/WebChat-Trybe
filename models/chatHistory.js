const connection = require('./connection');

const saveMsgOnDB = async (chatLine) => {
    const db = await connection();
    await db.collection('messages').insertOne(chatLine);
};

const rescueHistoryOnDB = async () => {
    const db = await connection();
    const chatHistory = await db.collection('messages').find({}).toArray();
    return chatHistory;
};

module.exports = {
    saveMsgOnDB,
    rescueHistoryOnDB,
};
