function dateInform() {
  const dt = new Date();
  return dt
    .toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    })
    .toUpperCase().replace(/\//g, '-');
}

module.exports = dateInform;
