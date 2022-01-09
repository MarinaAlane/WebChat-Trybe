const socketIo = (io) => {
    io.on('connection', () => {
        console.log('servidor conectado')
    }),
}