const chatModel = require('../../models/chat');

const getMessages = async (req, res) => {
    const dbMessages = await chatModel.getMessages();
    console.log(dbMessages);
    return res.status(200).render('', { dbMessages });
  };
  
  const createMessages = async (req, res) => {
    console.log(req.body);
    const addMessage = await chatModel.createMessage(req.body);
    return res.status(201).json(addMessage);
  };

module.exports = { getMessages, createMessages };
