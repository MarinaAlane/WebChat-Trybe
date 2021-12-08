const createMessage = (objMessage) => {
  const { chatMessage, nickname } = objMessage;
  const date = new Date();
  const msgDate = `${date.getDay(date)}/${date.getMonth(date) + 1}/
  ${date.getFullYear(date)} ${date.getTime(date)}`;
  
  return { chatMessage, nickname, msgDate };
};

module.exports = {
  createMessage,
};