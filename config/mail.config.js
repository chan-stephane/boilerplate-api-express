const logger = require("../utils/logger");
require("dotenv").config();

const mailConfig = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    no_reply: process.env.MAIL_NOREPLY,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
};

logger.info(`Mail config: ${JSON.stringify(mailConfig)}`);

module.exports = mailConfig;
