module.exports = (locale) => {
  const data = new Date();

  /* How to convert date: https://stackoverflow.com/questions/42862729/convert-date-object-in-dd-mm-yyyy-hhmmss-format */
  /* String.prototype.replaceAll() error fixed with: https://www.designcise.com/web/tutorial/how-to-fix-replaceall-is-not-a-function-javascript-error */
  const localeDate = data.toLocaleDateString(locale).replace(/\//g, '-');
  const localeTime = data.toLocaleTimeString(locale);

  return `${localeDate} ${localeTime}`;
};