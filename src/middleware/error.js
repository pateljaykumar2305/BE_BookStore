// 404 handler
export const notFoundHandler = (_req, res, _next) => {
  res.status(404).json({ message: 'Not Found' });
};

// Centralized error handler
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
};


