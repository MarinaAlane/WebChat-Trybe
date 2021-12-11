module.exports = () => {
  const date = new Date();
  const stringDate = date.toLocaleDateString('pt-BR').replace(/\//g, '-');
  const stringTime = date.toLocaleTimeString('pt-BR');

  return `${stringDate} ${stringTime}`;
};