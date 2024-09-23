const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    //Get token from header
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(401).json({ message: 'No Token Provided ,Authorization Denied' });
    }

    const token = authHeader.split(' ')[1];

    try {
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId; // Attach user ID to request object
        next();
    } catch (error) {
        console.error('Token Verification Error:', error.message);
        res.status(401).json({ message: 'Invalid Token' });
    }
}

module.exports = authMiddleware;