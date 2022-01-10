const connection = require('./connection');

const COLLECTION = 'messages';

const getAll = () => connection()
.then((db) => db.collection(COLLECTION).find().toArray());

const insertOne = (obj) => connection()
.then((db) => db.collection(COLLECTION).insertOne(obj));

module.exports = { insertOne, getAll }; 