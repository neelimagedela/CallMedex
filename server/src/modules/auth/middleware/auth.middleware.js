const AppError = require("../../../shared/utils/AppError");
const { verifyAccessToken } = require("../services/token.service");

const authenticate = async (req, res, next) => {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new AppError("Access token is missing", 401);
    }

    try {
      const decoded = verifyAccessToken(token);
      req.user = decoded;
      next();
    } catch (err) {
      console.log("JWT ERROR:", err);
      throw new AppError("Invalid or expired access token", 401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
};
