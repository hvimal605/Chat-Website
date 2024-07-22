const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.harshcookie;
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findById(decoded.userid).select('-password');
    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in secureRoute:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};
