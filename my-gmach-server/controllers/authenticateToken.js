const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
  
    const token = authHeader.split(" ")[1]; // the token is the second part of the header
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }
      
      req.user = decoded; // set the user ID in the request
      next();
    });
  };

  module.exports = { authenticateToken };
  