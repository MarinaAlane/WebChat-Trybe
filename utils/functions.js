const dateGenerator = () => {
  const date = new Date();
  const day = (date.getDate()).toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();
  const seg = date.getSeconds();
  return `${day}-${month}-${year} ${hour}:${min}:${seg}`;
};

module.exports = {
  dateGenerator,
};
