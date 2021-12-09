const createMessage = async (objMessage) => {
  const { chatMessage, nickname } = objMessage;
  const date = new Date();
  const actualDate = date.toLocaleString();
  const msgDate = actualDate.replace(/['/']/g, '-');
  
  return `${msgDate.toString()} - ${nickname}: ${chatMessage}`;
};

module.exports = {
  createMessage,
};