module.exports = () => {
  const date = new Date();
  const hour = date.toLocaleTimeString();
  const dateFormated = date.toISOString().split('T')[0].split('-').reverse().join('-');
  return `${dateFormated} ${hour}`;
};