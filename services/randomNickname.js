const fs = require('fs');

const colorFile = fs.readFileSync('colors.txt', 'utf-8');

const upcaseFirstCharacter = (string) => `${string[0].toUpperCase()}${string.slice(1)}`;

const mapTrim = (string) => string.trim();
const mapUpcaseCompositeNames = (string) => string.split(' ').map(upcaseFirstCharacter).join('-');
const reduceToObjectWithLengths = (acc, name) => {
  if (!acc[name.length]) {
    acc[name.length] = [];
  }
  acc[name.length].push(name);
  return acc;
};
const filterBy = {
  length: (min, max) => (string) => string.length >= min && string.length <= max,
  empty: (string) => string !== '',
};

const colors = colorFile.split('\n')
  .filter(filterBy.empty)
  .map(mapTrim)
  .filter(filterBy.length(3, 13))
  .map(mapUpcaseCompositeNames)
  .reduce(reduceToObjectWithLengths, {});

const animalFile = fs.readFileSync('animals.txt', 'utf-8');

const animals = animalFile.split('\n')
  .filter(filterBy.empty)
  .map(mapTrim)
  .filter(filterBy.length(3, 12))
  .map(mapUpcaseCompositeNames);

const getRandomElementFromArray = (targetArray, options = {}) => {
  const { min = 0, max = targetArray.length - 1 } = options;
  const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
  return targetArray[randomIndex];
};

const getRandomAnimal = () => getRandomElementFromArray(animals);

const getRandomColorWithLength = (length) => getRandomElementFromArray(colors[length]);

const getRandomNickName = () => {
  const animal = getRandomAnimal();
  const targetLength = 16;
  const color = getRandomColorWithLength(targetLength - 1 - animal.length);
  return `${color}-${animal}`;
};

module.exports = { getRandomNickName };
