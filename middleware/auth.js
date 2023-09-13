const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decodedToken;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = {
  authenticateUser,
};

