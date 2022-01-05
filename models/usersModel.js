const conn = require('./connection');

const createUser = async (object) => {
  try {
    const user = await conn()
      .then((db) => db.collection('users').insertOne({ ...object }));
    return user.ops[0];
  } catch (error) {
    console.error(error);
  }
};

const getAll = async () => {
  try {
    const all = await conn().then((db) => db.collection('users').find().toArray());
    console.log('all', all);
    return all;
  } catch (error) {
    console.error(error);
  }
};

const updateUsers = async (id, user) => {
  try {
    const updated = conn()
      .then((db) => db.collection('users')
        .findOneAndUpdate(
          { id },
          { $set: { nickname: user } },
          { upsert: true, returnNewDocument: true },
        ));
    return updated;
  } catch (error) {
    console.error(error);
  }
};

const oneById = async (id) => {
  console.log(id);
  try {
    const one = await conn()
      .then((db) => db.collection('users').findOne({ id }));
    console.log('one', one);
    return one;
  } catch (error) {
    console.error(error);
  }
};

const delOneUser = async (id, nickname) => {
  // console.log(id, nickname);
  try {
    let value = await id;
    if (id !== nickname) {
      value = nickname;
    }
    const test = await conn().then((db) => db.collection('users').deleteOne(value));
    console.log('del', test);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createUser, getAll, updateUsers, delOneUser, oneById };
