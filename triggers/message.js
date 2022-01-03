const msgs = [];

const format = ({ nickname, text }) => {
  const today = new Date().toLocaleString('pt-BR', { hour12: true });
  const one = {
    text,
    nickname,
    timestamp: today,
  };
  msgs.push(one);
  return one;
};

const getAllMsg = () => msgs;

const deleteOneMsg = (id, nickname) => {
  const index1 = msgs.findIndex((e) => e.nickname === id);
  const index2 = msgs.findIndex((e) => e.nickname === nickname);
  // console.log(index1, index2);
  if (index1 !== -1) msgs.splice(index1, 1);
  if (index2 !== -1) msgs.splice(index2, 1);
};

module.exports = { format, getAllMsg, deleteOneMsg };
