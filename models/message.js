const connection = require('./connection');

class Messages {
  constructor(msg) {
    this.message = msg;
    this.collection = 'messages';
  }

  async getAll() {
    const db = await connection();
    const msg = await db.collection(this.collection).find().toArray();
    return msg;
  }
  
 async saveHistory() {
    const db = await connection();
    const messages = await db.collection(this.collection).insertOne(this.message);
    return messages;
  }
}

module.exports = Messages;
