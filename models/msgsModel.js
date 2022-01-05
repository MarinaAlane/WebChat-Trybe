const conn = require('./connection');

const addMsg = async (message) => {
  try {
    const addingNewMsg = await conn()
      .then((db) => db.collection('messages').insertOne(message));
    return addingNewMsg;  
  } catch (error) {
    console.error(error);
  }
};

const getAll = async () => {
  try {
    const all = await conn()
      .then((db) => db.collection('messages').find().toArray());
    return all; 
  } catch (error) {
    console.error(error);
  }
};

const delMsg = async (id, nickname) => {
  // console.log('3', id, nickname);
  try {
    let del = id;
    if (id !== nickname) {
      del = nickname;
    }
    const deleted = await conn()
      .then((db) => db.collection('messages')
        .deleteMany({ nickname: del }));
    return deleted;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addMsg, getAll, delMsg };