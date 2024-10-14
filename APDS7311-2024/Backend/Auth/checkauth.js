const jwt = require('jsonwebtoken');

const checkauth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Authorization header missing or malformed');
      return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token received:', token);

    jwt.verify(token, 'Thisthestringwewilluseforourtoken.ThelongerthestringMorecomplicatedthetokenwillbe', (err, decoded) => {
      if (err) {
        console.error('JWT verification error:', err);
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.userData = decoded; 
      next();
    });
  } catch (err) {
    res.status(401).json({ message: 'Authentication failed' });
    console.error('Error in checkauth:', err);
  }
};

module.exports = checkauth;
