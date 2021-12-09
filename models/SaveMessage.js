const connection = require('./connection');

class SaveMessage {
  constructor(message) {
    this.message = message;
    this.collection = 'messages';
  }

  async saveMessages() {
    const db = await connection();
    await db.collection(this.collection).insertOne(this.message);
  }

  async getMessages() {
    const db = await connection();
    const messages = await db.collection(this.collection).find().toArray();
    return messages;
  }
}

module.exports = SaveMessage;