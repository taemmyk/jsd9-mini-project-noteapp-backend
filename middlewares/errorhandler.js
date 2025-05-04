const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const response = {
    message: err.message,
    status: status,
  };
  res.status(status).send(response);
};

export default errorHandler;
