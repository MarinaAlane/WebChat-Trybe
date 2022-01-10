const connection = require('./connection');

const saveChat = async (nickname, chatMessage, formatDate) => {
    try {
        const saveConection = await connection();
        const saveMessage = await saveConection
        .collection('messages').insert({
            message: chatMessage,
            nickname, 
            timestamp: formatDate });

        return console.log(saveMessage, 'Salvo com sucesso!');
    } catch (error) {
        console.log('Erro ao gravar dados, Log: ', error);
    }
};

const findMessages = async () => {
    try {
        const findeMessages = await connection();
        const messagensAll = await findeMessages.collection('messages').find().toArray();
        return messagensAll;
    } catch (error) {
        console.log('Error: ', error);
    }
};

const alterName = async (nameAnt, nameAtu) => {
    const alteraNameDb = await connection();
    const alter = await alteraNameDb.collection('messages')
    .update({ nickname: nameAnt }, { $set: { nickname: nameAtu } }, 
    { returnOriginal: false });

    return alter;
};

module.exports = {
    saveChat,
    findMessages,
    alterName,
};