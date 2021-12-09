const model = require('../models/chatModel');

const create = async ({ chatMessage, nickname, messageDate }) => {
    const chat = await model.create({ chatMessage, nickname, messageDate });
    return chat;
};
 
const getAll = async () => {
    const chats = await model.getAll();
    return chats;
};

module.exports = {
    create,
    getAll,
};