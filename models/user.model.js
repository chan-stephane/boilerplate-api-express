const jwt = require("jsonwebtoken");
const prisma = require("../database/prisma");
const logger = require("../utils/logger");
const bcrypt = require("bcrypt");
const jwtConfig = require("../config/jwt.config");

async function authenticate(email, password) {
    const user = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            uuid: true,
            email: true,
            password: true
        },
    });
    
    if (!user) {
        logger.error(`${email} not found`);
        return {
            code: 404,
            message: "Please register first",
            data: null,
        };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        logger.error(`${email} password is incorrect`);
        return {
            code: 401,
            message: "Your password is incorrect",
            data: null,
        };
    }
    const userFormatted = {
        id: user.id,
        uuid: user.uuid,
        email: user.email
    };
    const token = jwt.sign({ user: userFormatted }, jwtConfig.secret, { expiresIn: parseInt(jwtConfig.expiresIn) });
    return {
        code: 200,
        message: "User authenticated successfully",
        data: { 
            user: userFormatted, 
            token 
        },
    };
}

module.exports = {
    authenticate,
};