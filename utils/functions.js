const dateGenerator = () => {
  const date = new Date();
  const day = (`0${date.getDate()}`).toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear();
  const hour = date.getHours(); // 0-23
  const min = date.getMinutes(); // 0-59
  const seg = date.getSeconds(); // 0-59
  return `${day}/${month}/${year} ${hour}:${min}:${seg} -`;
};

module.exports = {
  dateGenerator,
};
