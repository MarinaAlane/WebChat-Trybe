const connection = require('./connection');

const COLLECTION = 'messages';

const getAllModels = () => connection()
.then((db) => db.collection(COLLECTION).find().toArray());

const postNewMessagesModel = (obj) => connection()
    .then((db) => db.collection(COLLECTION).insertOne(obj));

module.exports = { postNewMessagesModel, getAllModels };