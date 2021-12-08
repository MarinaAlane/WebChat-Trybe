const createMessage = (objMessage) => {
  const { chatMessage, nickname } = objMessage;
  const date = new Date();
  const actualDate = date.toLocaleString();
  // const bar = '/';
  const msgDate = actualDate.replace(/['/']/g, '-');
  
  return `${msgDate.toString()} - ${nickname}: ${chatMessage}`;
};

module.exports = {
  createMessage,
};