const firstname = [
  'Marquis',
  'Samir',
  'Adrien',
  'Joyce',
  'Pierce',
  'Juliette',
  'Kelton',
  'Jacob',
  'Isiah',
  'Lindsay',
  'Kian',
  'Jordyn',
  'Jaquan',
  'Anya',
  'Wayne',
  'Khalil',
];
const lastname = [
  'Mills',
  'Mercer',
  'Reeves',
  'Hines',
  'Sanford',
  'Irwin',
  'Koch',
  'Hinton',
  'Estes',
  'Jackson',
  'Lowe',
  'Guerra',
  'Pineda',
  'Franco',
  'Cowan',
  'Krause',
];

/* eslint-disable */
function generateName() {
  let rand_first = Math.floor(Math.random() * firstname.length);
  let rand_last = Math.floor(Math.random() * lastname.length);
  return `${firstname[rand_first]}-${lastname[rand_last]}`;
}
/* eslint-enable */