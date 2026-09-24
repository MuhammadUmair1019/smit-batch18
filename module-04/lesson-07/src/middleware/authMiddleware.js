import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;


        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization token required"
            });
        }

        const [type, token] = authHeader.split(" ");

        if (type !== "Bearer" || !token) {
            return res.status(401).json({
                message: "Invalid authorization format"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;
