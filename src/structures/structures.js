const newDate = () => {
  const hour = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString('pt-BR');
  return `${date.replace(/\//g, '-')} ${hour}`;
}; 
module.exports = { newDate };