let server;
exports.startServer = (app) => {
  const PORT = process.env.PORT || 3000;

  server = app.listen(PORT, (err) => {
    if (err) {
      return;
    }
    console.log(`Servidor ouvindo na porta ${PORT}`);
  });
};

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});
