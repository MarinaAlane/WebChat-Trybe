const { addMsg, getAll, delMsg } = require('../models/msgsModel');

const msgs = [];

const format = async ({ nickname, text }) => {
  const today = new Date().toLocaleString('pt-BR', { hour12: true });
  const one = {
    text,
    nickname,
    timestamp: today,
  };
  msgs.push(one);
  const saveMsg = await addMsg(one);
  // console.log('1', test);
  return saveMsg;
};

const getAllMsg = async () => {
  // msgs;
  const all = await getAll();
  // console.log('2', test2);
  return all;
};

const deleteOneMsg = async (id, nickname) => {
  await delMsg(id, nickname);
  // console.log(id, nickname);
  let index1 = msgs.findIndex((e) => e.id === id);
  let index2 = msgs.findIndex((e) => e.nickname === nickname);
  // console.log(index1, index2);
  // if (index1 !== -1) msgs.splice(index1, 1);if (index2 !== -1) msgs.splice(index2, 1);
    // index2 = msgs.findIndex((e) => e.nickname === nickname);
  while (index2 !== -1 || index1 !== -1) {
    console.log('1', index1, index2);
    msgs.splice(index1, 1);
    index1 = msgs.findIndex((e) => e.nickname === id);
    console.log('2', index1, index2);
    msgs.splice(index2, 1);
    index2 = msgs.findIndex((e) => e.nickname === nickname);
    console.log('3', index1, index2);
  }
};

module.exports = { format, getAllMsg, deleteOneMsg };
