function getNameIndex(array, name1, oldName) {
  const index = array.indexOf(name1);
  if (index < 0) {
    const newIndex = array.indexOf(oldName);
    return array[newIndex];
  }
  return array[index];
}

module.exports = getNameIndex;
