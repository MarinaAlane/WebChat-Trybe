class Calendar {
  constructor() {
    this.date = new Date();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.hours = this.date.getHours();
    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();
    this.time = `${this.hours}:${this.minutes}:${this.seconds}`;
    this.dateFormat = `${this.day}-${this.month}-${this.year} ${this.time}`;
  }

  getDate() {
    return this.dateFormat;
  }
}

module.exports = (io) =>
  io.on('connection', (socket) => {
    const user = { ...socket };
    socket.emit('newUser', () => {});
    socket.on('login', (data) => {
      user.nickname = data;
      io.emit('serverAnnouncement', user.nickname);
    });
    socket.on('message', ({ chatMessage, nickname }) => {
      const date = new Calendar();
      if (nickname !== user.nickname) user.nickname = nickname;
      const message = `${date.getDate()}-${user.nickname}-${chatMessage}`;
      return io.emit('message', message);
    });
    socket.on('setName', (newNickname) => { user.nickname = newNickname; });
    socket.on('disconnect', () => {
      io.emit('serverAnnouncement', { id: socket.id, message: `User ${socket.id} disconnected` });
    });
  });
