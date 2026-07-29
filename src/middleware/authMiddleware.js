const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // Read the Authorization header
        const authHeader = req.headers.authorization;

        // Check if the header exists
        if (!authHeader) {
            return res.status(401).json({
                error: "Authorization header is missing",
            });
        }

        // Extract the token
        const token = authHeader.split(" ")[1];

        // Check if the token exists
        if (!token) {
            return res.status(401).json({
                error: "Token is missing",
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Attach the decoded payload to the request
        req.user = decoded;

        // Continue to the next middleware/controller
        next();

    } catch (error) {
        return res.status(401).json({
            error: "Invalid or expired token",
        });
    }
};

module.exports = authMiddleware;