function formatAMPM(hora) {
  const objeto = {
    hora,
    meridion: 'AM',
  };
  if (hora >= 13) {
    objeto.hora = hora - 12;
    objeto.meridion = 'PM';
  }
  return objeto;
}

function createMessage() {
  const dateNow = Date.now();
  const dia = new Date(dateNow).getDate();
  const mes = (new Date(dateNow).getMonth()) + 1;
  const ano = new Date(dateNow).getFullYear();
  const hor = formatAMPM(new Date(dateNow).getHours());
  const min = new Date(dateNow).getMinutes();
  const sec = new Date(dateNow).getSeconds();
  const data = `${dia}-${mes}-${ano} ${hor.hora}:${min}:${sec} ${hor.meridion}`;
  return data;
}

module.exports = {
  createMessage,
};