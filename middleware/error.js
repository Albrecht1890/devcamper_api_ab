function errorHandler(err, req, res, next) {
  // Log to console for the developer
  console.log(err.stack.red);

  res
    .status(err.statusCode || 500)
    .json({ success: false, error: err.message || 'S erver Error' });
}

module.exports = errorHandler;
