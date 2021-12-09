const { connection } = require('./connection');

const addNewMessage = async ({ nickname, chatMessage, messageMoment }) => {
    const db = await connection();
    const messages = await db.collection('messages').insertOne({
      message: chatMessage,
      nickname,
      timestamp: messageMoment,
    });
return messages;
};

const findAllMessages = async () => {
    const db = await connection();
    const allMessages = await db.collection('messages').find().toArray();
    return allMessages;
};
module.exports = {
    addNewMessage,
    findAllMessages,
};