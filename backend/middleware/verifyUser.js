const jwt = require('jsonwebtoken');

const verifyUserMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization;

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.jwtkey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token provided' });
    }

    // Attach the decoded user ID to the request object
    req.user = { _id: decoded.userId };

    // Move to the next middleware or route handler
    next();
  });
};

module.exports = verifyUserMiddleware;
