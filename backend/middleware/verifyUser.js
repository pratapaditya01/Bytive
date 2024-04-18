const verifyUserMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization;

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  // Move to the next middleware or route handler
  next();
};

module.exports = verifyUserMiddleware;
