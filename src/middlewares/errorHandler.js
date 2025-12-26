const errorHandler = (err, req, res, nxt) => {
  return res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
};

export default errorHandler;
