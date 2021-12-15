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

let nicknames = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('newUser', (nickname) => {
      nicknames.push(nickname);
      io.emit('newUser', nicknames);
    });
  
    socket.on('disconnect', () => {
      nicknames.splice(nicknames.findIndex((nick) => nick.includes(socket.id)));
      io.emit('disconnected', nicknames);
    });

    socket.on('changeNickname', ({ removedNick, newNick }) => {
      nicknames = nicknames.filter((nickname) => nickname !== removedNick);
      nicknames.push(newNick);

      io.emit('changeNickname', nicknames);
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${getDateHour()} - ${nickname} - ${chatMessage}`);
    });
  });
};
