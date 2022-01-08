const nextErrors = ((err, _req, res, _next) => {
  const defaultStatus = 500;
  
  return res.status(defaultStatus).json({
    message: `Internal server error: ${err.message}`,
  });
});

module.exports = nextErrors;
