// src: https://pt.stackoverflow.com/questions/369365/data-e-hora-no-formato-brasileiro-dd-mm-aaaa-hhmmss
module.exports = () => {
  const date = new Date();
  const currentDate = date.toLocaleDateString('pt-BR').replace(/\//g, '-');
  const currentHour = date.toLocaleTimeString('pt-BR', { hour12: true });
  return `${currentDate} ${currentHour}`;
};