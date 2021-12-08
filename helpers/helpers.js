const moment = require('moment');

function dateGenerator() {
  const date = moment().format('DD-MM-YYYY h:mm:ss A');
  return date;
}

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

function randomNickGenerator(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

module.exports = { dateGenerator, randomNickGenerator };
