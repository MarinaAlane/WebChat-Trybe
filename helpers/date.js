module.exports = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();

  const amPmFormat = hours >= 12 ? 'PM' : 'AM';

  hours = hours > 12 ? `0${hours - 12}` : `0${hours}`;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  const dateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${amPmFormat}`;

  return dateTime;
};
