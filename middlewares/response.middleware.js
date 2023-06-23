const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query

  res.sendResponse = (data) => {
    res.status(200).json(data);
  };

  res.sendBadRequest = (message) => {
    res.status(400).json({ error: true, message });
  };

  res.sendNotFound = (message) => {
    res.status(404).json({ error: true, message });
  };

  next();
};

export { responseMiddleware };
