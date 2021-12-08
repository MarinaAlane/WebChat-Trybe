const d = new Date();
const date = d.toISOString().slice(0, 10).split('-').reverse();
const convertDate = date.join('-');

let AM_OR_PM = 'AM';

const getFormatTime = () => {
  const hour = d.getHours();
  if (hour > 12) {
    AM_OR_PM = 'PM';
  }

  const formatHour = hour - 12;
  const minutesAndSeconds = d.toString().slice(18, 24);
  return {
    timestamp: `${convertDate} ${formatHour + minutesAndSeconds} ${AM_OR_PM}`,
  };
};

module.exports = {
  getFormatTime,
};
