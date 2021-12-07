const formatZero = (data) => {
  if (data > 10) return data;
  return `0${data}`;
};

const formatHour = (data) => {
  if (data > 12) {
    return { time: formatZero(data - 12), code: 'PM' };
  }

  return { time: formatZero(data), code: 'AM' };
};

const getTime = () => {
  const currentDate = new Date();
  const day = formatZero(currentDate.getDate());
  const month = formatZero(currentDate.getMonth() + 1);
  const year = currentDate.getFullYear();
  const hour = formatHour(currentDate.getHours());
  const minute = formatZero(currentDate.getMinutes());
  const second = formatZero(currentDate.getSeconds());

  return `${day}-${month}-${year} ${hour.time}:${minute}:${second} ${hour.code}`;
};

module.exports = {
  getTime,
};