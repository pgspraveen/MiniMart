import jwt from 'jsonwebtoken'; // Import JWT for token verification

// Middleware function that accepts the JWT secret
export default (JWT_SECRET) => (req, res, next) => {
  try {
    const token = req.header('x-token'); // Get token from request header
    if (!token) return res.status(401).send('Token not found'); // If no token, return 401

    const decoded = jwt.verify(token, JWT_SECRET); // Verify token with secret
    req.user = decoded.user; // Attach decoded user info to request object
    next(); // Call next middleware or route handler
  } catch (err) {
    console.error(err);
    res.status(401).send('Invalid token'); // Return 401 if token is invalid
  }
};
