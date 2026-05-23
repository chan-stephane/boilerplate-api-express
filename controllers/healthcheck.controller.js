const logger = require("../utils/logger");

exports.up = async (req, res) => {
    logger.info(`Server is up`);
    return res.status(200).json({
        code: 200,
        status: "success",
        message: `Server is up`,
        data: {
            status: "Up",
            message: `Server is up`,
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        },
    });
};
