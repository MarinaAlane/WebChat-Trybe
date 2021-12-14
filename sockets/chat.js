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

const nicknames = [];

module.exports = (io) => {
  io.on('connection', (socket) => {    
    socket.on('user', (nickname) => { 
      nicknames.push(nickname);
      io.emit('user', nicknames); 
    });

    socket.on('disconnect', () => {
      nicknames.splice(nicknames.findIndex((nick) => nick.match(/socket.id/i)));
      io.emit('disconnected', nicknames);
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${getDateHour()} - ${nickname} - ${chatMessage}`);
    });

    socket.on('changeNickname', (nickname) => {
      nicknames.splice(nicknames.findIndex((nick) => nick.match(/socket.id/i)));
      nicknames.push(nickname);
      io.emit('changeNickname', nicknames);
    });
  });
};
