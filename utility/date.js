const generateDate = () => {
  const generation = new Date();
  const day = generation.getDate();
  const month = generation.getMonth();
  const year = generation.getFullYear();
  const hour = generation.getHours();
  const minutes = generation.getMinutes();
  const seconds = generation.getSeconds();
  const date = `${day}-${month}-${year} ${hour}:${minutes}:${seconds}`;
  return date;
};

module.exports = { generateDate };
