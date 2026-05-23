const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const logger = require("../utils/logger");

function authenticate(req, res, next) {
    const authCookie = req.cookies?.x-access-token;

    if (authCookie == null) {
        return res.status(401).json({
            code: 401,
            status: "error",
            message: "Please login to continue",
            data: null,
        });
    }
    try {
        const userAuthenticated = jwt.verify(authCookie, JWT_SECRET);
        req.userAuthenticated = userAuthenticated;
        logger.info(
            `Authenticating user with cookies token: ${authCookie} - ${JSON.stringify(userAuthenticated)}`,
        );
        next();
    } catch (err) {
        logger.error(`Error authenticating user: ${err}`);
        return res.status(401).json({
            code: 401,
            status: "error",
            message: "Unauthorized",
            data: null,
        });
    }
}



module.exports = {
    authenticate,
};
