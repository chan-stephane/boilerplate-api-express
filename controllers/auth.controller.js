const logger = require("../utils/logger");
const userModel = require("../models/user.model");

exports.authenticate = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info(`Authenticating user with email: ${email}`);
    const response = await userModel.authenticate(email, password);
    if (response.code == 200) {
      if (!response.data.user) {
        return res.status(response.code).json({
          code: response.code,
          status: response.code == 200 ? "success" : "error",
          message: response.message,
          data: response.data,
        });
      }
      res.cookie("x-access-token", response.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 3600000, // 1 hour,
        path: "/",
        // domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : 'localhost',
      });
    }
    return res.status(response.code).json({
      code: response.code,
      status: response.code == 200 ? "success" : "error",
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(401).json({
      code: 401,
      status: "error",
      message: err.message,
      data: null,
    });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("x-access-token");
  return res.status(200).json({
    code: 200,
    status: "success",
    message: "Logged out successfully",
    data: null,
  });
};