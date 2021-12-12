module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Cliente ${socket.id} se conectou`);
  
  socket.on('message', (message) => {
    console.log(message);
  });
}); 
