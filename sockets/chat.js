const formatNumber = (num) => (num >= 10 ? num : `0${num}`);

const getDateHour = () => {
  const date = new Date();
  const seconds = date.getSeconds();
  const formatSecs = formatNumber(seconds);

  const minutes = date.getMinutes();
  const formatMin = formatNumber(minutes);

  const hour = date.getHours();
  const formatHour = formatNumber(hour);

  const stringTime = `${formatHour}:${formatMin}:${formatSecs}`;

  const formatYear = date.getFullYear();

  const month = date.getMonth() + 1;
  const formatMonth = formatNumber(month);
  
  const day = date.getDate();
  const formatDay = formatNumber(day);
  
  const stringDate = `${formatDay}-${formatMonth}-${formatYear}`;

  const formattedDateHour = `${stringDate} ${stringTime}`; 
  return formattedDateHour;
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`${socket.id} entrou no chat!`);
    socket.on('disconnect', () => {
      console.log(`${socket.id} saiu do chat!`);
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      const dateTime = getDateHour();
      io.emit('message', { dateTime, nickname, chatMessage });
    });
  });
};
