function addDigit(num) { return num > 10 ? num : `0${num}`; }

function currentDate() {
  const date = new Date();
  
  let day = date.getDate();
  day = addDigit(day);

  let month = date.getMonth() + 1;
  month = addDigit(month);

  const year = date.getFullYear();

  let hours = date.getHours();
  hours = addDigit(hours);

  let minutes = date.getMinutes();
  minutes = addDigit(minutes);
  
  let seconds = date.getSeconds();
  seconds = addDigit(seconds);

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

module.exports = currentDate;