const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");


    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        console.log("Decoded token:", decoded); 
        
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Token verification failed", error);
        return res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = { verifyToken };
