const fs = require('fs');

const colorFile = fs.readFileSync('colors.txt', 'utf-8');

const upcaseFirstCharacter = (string) => `${string[0].toUpperCase()}${string.slice(1)}`;

const colors = colorFile.split('\n')
  .filter((name) => name !== '')
  .map((name) => name.trim())
  .filter((name) => name.length > 2 && name.length < 14)
  .map((name) => name.split(' ').map(upcaseFirstCharacter).join(' '))
  .reduce((acc, name) => {
    if (!acc[name.length]) {
      acc[name.length] = [];
    }
    acc[name.length].push(name);
    return acc;
  }, {});

const animals = [
  'Ant',
  'Ape',
  'Asp',
  'Ass',
  'Bat',
  'Bee',
  'Cat',
  'Cod',
  'Cow',
  'Dog',
  'Eel',
  'Emu',
  'Fly',
  'Fox',
  'Owl',
  'Pig',
  'Rat',
  'Bass',
  'Bear',
  'Bird',
  'Carp',
  'Crab',
  'Crow',
  'Deer',
  'Dove',
  'Duck',
  'Fish',
  'Flea',
  'Frog',
  'Goat',
  'Hare',
  'Hawk',
  'Lion',
  'Moth',
  'Mule',
  'Orca',
  'Wolf',
  'Aphid',
  'Bison',
  'Camel',
  'Cobra',
  'Crane',
  'Eagle',
  'Finch',
  'Goose',
  'Horse',
  'Husky',
  'Llama',
  'Moose',
  'Mouse',
  'Otter',
  'Panda',
  'Perch',
  'Quail',
  'Raven',
  'Sheep',
  'Shrew',
  'Skunk',
  'Snail',
  'Snake',
  'Tiger',
  'Whale',
  'Zebra',
  'Alpaca',
  'Baboon',
  'Badger',
  'Beaver',
  'Bedbug',
  'Beetle',
  'Bobcat',
  'Condor',
  'Cougar',
  'Coyote',
  'Cuckoo',
  'Donkey',
  'Falcon',
  'Ferret',
  'Gopher',
  'Iguana',
  'Impala',
  'Lizard',
  'Monkey',
  'Oyster',
  'Parrot',
  'Pigeon',
  'Rabbit',
  'Spider',
  'Walrus',
  'Buffalo',
  'Buzzard',
  'Caribou',
  'Catfish',
  'Cheetah',
  'Chicken',
  'Cricket',
  'Dolphin',
  'Gorilla',
  'Hamster',
  'Ladybug',
  'Leopard',
  'Lobster',
  'Octopus',
  'Ostrich',
  'Peacock',
  'Pelican',
  'Penguin',
  'Raccoon',
  'Rooster',
  'Aardvark',
  'Anaconda',
  'Antelope',
  'Chipmunk',
  'Dinosaur',
  'Elephant',
  'Flamingo',
  'Kangaroo',
  'Mongoose',
  'Mosquito',
  'Pheasant',
  'Sea Lion',
  'Alligator',
  'Armadillo',
  'Barracuda',
  'Butterfly',
  'Crocodile',
  'Dragonfly',
  'Porcupine',
  'Bald Eagle',
  'Chimpanzee',
  'Polar Bear',
  'Caterpillar',
  'Grasshopper',
  'Hummingbird',
  'Rattlesnake',
  'Basset Hound',
  'Hippopotamus',
];

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
  return `${color} ${animal}`;
};

module.exports = { getRandomNickName };
