const ApiErrors = require('./ApiErrors');

const nextErrors = ((err, _req, res, _next) => {
  // console.error(err);
  if (err instanceof ApiErrors) return res.status(err.status).json({ message: err.message });
  
  const defaultStatus = 500;
  
  return res.status(defaultStatus).json({
    message: `Internal server error: ${err.message}`,
  });
});

module.exports = nextErrors;
