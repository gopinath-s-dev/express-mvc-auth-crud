const notFoundHandler = (req, res, nxt) => {
  return res.status(404).json({
    error: "Route Not Found",
  });
};

export default notFoundHandler;
