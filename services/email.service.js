const nodemailer = require("nodemailer");
const configMail = require("../config/mail.config.js");
const logger = require("../utils/logger.js");

const transport = nodemailer.createTransport({
    service: "Gmail",
    host: configMail.host,
    port: configMail.port,
    secure: process.env.NODE_ENV === "production",
    auth: {
        user: configMail.user,
        pass: configMail.password
    }
});

const sendEmail = async (receiver, subject, message) => {
    logger.info(`Sending email to ${receiver} with subject ${subject}`);
    return await transport.sendMail({
        from: configMail.no_reply ? configMail.no_reply : configMail.user,
        to: receiver,
        subject: subject,
        text: message,
        html: message,
    });
};

module.exports = {
    sendEmail,
};
