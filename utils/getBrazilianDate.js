module.exports = () => {
  // Para realizar a melhor formação de hora, consultei este artigo:
  // https://pt.stackoverflow.com/questions/369365/data-e-hora-no-formato-brasileiro-dd-mm-aaaa-hhmmss

  // Usei a mesma lógica para a data
  const date = new Date();
  const currentDate = date.toLocaleDateString('pt-BR').replaceAll(/\//g, '-');
  const currentHour = date.toLocaleTimeString('pt-BR', { hour12: true });
  return `${currentDate} ${currentHour}`;
};
