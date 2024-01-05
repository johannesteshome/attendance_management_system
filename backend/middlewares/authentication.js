const { isTokenValid, attachCookiesToResponse } = require("../utils/jwt");
const TokenModel = require("../models/Token.model");
const { StatusCodes } = require("http-status-codes");
const { ObjectId } = require("mongodb");

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      // console.log("are you here", req.user);
      return next();
    }
    const payload = isTokenValid(refreshToken);
    // console.log(payload.refreshToken, payload.user._id, "here");

    // TODO: User part is a little bit confusing look into that
    const userId = new ObjectId(payload.user._id)
    const existingToken = await TokenModel.findOne({
      user: userId,
      refreshToken: payload.refreshToken,
    });
    // console.log(existingToken, 'existing token');

    if (!existingToken || !existingToken?.isValid) {
      throw new Error("Invalid token or session expired");
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });
    req.user = payload.user;
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication Invalid! No logged in session" });
  }
}

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Unauthorized to access this route" });
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};

