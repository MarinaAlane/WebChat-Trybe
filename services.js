function formatDate() {
  const dateNow = Date.now();
  const day = new Date(dateNow).getDate();
  const mouth = (new Date(dateNow).getMonth()) + 1;
  const year = new Date(dateNow).getFullYear();
  const hour = new Date(dateNow).getHours();
  const minute = new Date(dateNow).getMinutes();
  const second = new Date(dateNow).getSeconds();
  const data = `${day}-${mouth}-${year}
                ${hour}:${minute}:${second}
                ${hour < 13 ? 'AM' : 'PM'}`;
  return data;
}

module.exports = {
  formatDate,
};
