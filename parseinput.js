const fs = require('fs');

const input = fs.readFileSync('./colors.txt', 'utf-8');

const colors = input.split('\n')
  .filter((name) => name !== '')
  .map((name) => name.trim())
  .filter((name) => name.length > 2 && name.length < 14)
  .sort((a, b) => a.length - b.length)
  .reduce((acc, name) => {
    if (!acc[name.length]) {
      acc[name.length] = [];
    }
    acc[name.length].push(name);
    return acc;
  }, {});

fs.writeFileSync('./colors.js', JSON.stringify(colors, null, 2));
