const formatDate = () => {
  const date = new Date();
  const dateFormat = date.toLocaleString().split('/').join('-');
  return dateFormat;
  };

console.log(formatDate());