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
const middleName = [
  'Doidao',
  'DaQuebrada',
  'ExBBB',
  'Diferenciado',
  '10Colado',
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
  const randFirst = Math.floor(Math.random() * firstname.length);
  const randMiddle = Math.floor(Math.random() * middleName.length);
  const randLast = Math.floor(Math.random() * lastname.length);
  return `${firstname[randFirst]}-${middleName[randMiddle]}-${lastname[randLast]}`;
}
/* eslint-enable */