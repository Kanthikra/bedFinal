const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message:
      "An error occurred on the server, please double-check your request!",
    error: err.message,
  });
};

export default errorHandler;
