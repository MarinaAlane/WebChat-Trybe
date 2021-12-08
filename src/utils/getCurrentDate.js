module.exports = (locale) => {
    const data = new Date();
  
    /* como converter a data: https://stackoverflow.com/questions/42862729/convert-date-object-in-dd-mm-yyyy-hhmmss-format */
    const localeDate = data.toLocaleDateString(locale).replace(/\//g, '-');
    const localeTime = data.toLocaleTimeString(locale);
  
    return `${localeDate} ${localeTime}`;
  };