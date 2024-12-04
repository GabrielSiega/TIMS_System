const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified; // Attach user info to request object
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid Token" });
    }
};

module.exports = authenticateToken;
