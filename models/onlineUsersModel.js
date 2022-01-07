// nao consegui implementar fs por fs.writeFile/writeFileSync bug o server e o sokect io
// possivelmente implementei errado

// require('dotenv').config();
// const fs = require('fs');
// const path = require('path');


// const { DATABANK_PATH = '../databank/online-users.json' } = process.env;
// const databankPath = path.join(__dirname, DATABANK_PATH);

// const getList = () => {
//   try {
//     // fs le e retorna como string(utf-8), eu converto pra json com parse e retorno
//     const list = fs.readFileSync(databankPath, 'utf-8');
//     return JSON.parse(list);
//   } catch (err) {
//     console.log('fs error ->',err);
//   }
// };

// const addUser = (userId) => {
//   try {
//     const list = getList();
//     list.push({ userId });
//     fs.writeFileSync(databankPath, JSON.stringify(list) , 'utf-8');
//   } catch (err) {
//     console.log('fs error ->',err);
//   }
// };

// const delUser = (id) => {
//   try {
//     const list = getList().filter((user) => user.userId !== id);
//     fs.writeFileSync(databankPath, JSON.stringify(list) , 'utf-8');
//   } catch (err) {
//     console.log('fs error ->',err);
//   }
// };

module.exports = { 
  getList,
  addUser,
  delUser,
};
