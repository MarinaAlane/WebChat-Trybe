const getActualDateFormated = (dateToformat) => {
  const date = dateToformat || new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const actualDate = `${day}-${month}-${year} ${hour}:${minutes}:${seconds}`;
  if (hour > 12) return actualDate.concat(' PM');
  return actualDate.concat(' AM');
};

const createMessage = ({ chatMessage, nickname }) => {
  const fullMessage = `${getActualDateFormated()} - ${nickname}: ${chatMessage}`;
  return fullMessage;
};

module.exports = {
  createMessage,
  getActualDateFormated,
};
