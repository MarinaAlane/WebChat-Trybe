const connection = require('./connection');

class SaveMessage {
  constructor(message) {
    this.message = message;
  }

  async saveMessages() {
    const db = await connection();
    await db.collection('messages').insertOne(this.message);
  }
}

module.exports = SaveMessage;