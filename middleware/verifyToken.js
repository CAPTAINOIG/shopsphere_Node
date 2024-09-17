const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    
    if (!authHeader) return res.status(403).send("A token is required for authentication");

    const token = authHeader.split(" ")[1];
    console.log(token);

    if (!token) return res.status(403).send("Token is missing");

    console.log("Token received:", token);

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            console.error("Token verification failed:", err.message);
            return res.status(401).send("Invalid Token");
        }
        req.user = decoded; // Attach user info to request
        next();
    });
};

module.exports = verifyToken;
