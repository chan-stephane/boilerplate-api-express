const logger = require("../utils/logger");
require("dotenv").config();

const jwtConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION,
};

logger.info(`JWT config: ${JSON.stringify(jwtConfig)}`);

module.exports = jwtConfig;
