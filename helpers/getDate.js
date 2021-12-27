const moment = require('moment');

// module.exports = () => {
//   const currentDate = new Date();
//   const day = currentDate.getDate();
//   const month = currentDate.getMonth();
//   const year = currentDate.getFullYear();
//   let hours = currentDate.getHours();
//   let minutes = currentDate.getMinutes();
//   let seconds = currentDate.getSeconds();
//   const ampm = hours >= 12 ? 'PM' : 'AM';

//   hours = hours > 12 ? `0${hours - 12}` : `0${hours}`;
//   minutes = minutes < 10 ? `0${minutes}` : minutes;
//   seconds = seconds < 10 ? `0${seconds}` : seconds;

//   const dateTimes = `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
//   return dateTimes;
// };
module.exports = () => {
  const data = moment().locale('pt-br').format('L').replace(/\//g, '-');
  const time = moment().format('LTS');
  return `${data} ${time}`;
};
