const { asyncHandler } = require("../utils/asyncErrorHandlerWrapper");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");

exports.verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); //recieved payload

  if (!decodedToken) {
    throw new ApiError(401, "Invalid Access Token");
  }

  // Fetch user data using the primary key
  const user = await User.findByPk(decodedToken._id, {
    attributes: { exclude: ["password", "refreshToken"] },
  });

  if (!user) {
    throw new ApiError(401, "Couldn't find user");
  }

  req.user = user;
  next();
});

// Role Based Access Control
exports.isAdmin = asyncHandler(async (req, _, next) => {
  if (req.user.role !== "Admin") {
    throw new ApiError(401, "This is protected route for admin");
  }
  next();
});

exports.isPlayer = asyncHandler(async (req, _, next) => {
  if (req.user.role !== "Player") {
    throw new ApiError(401, "This is protected route for player");
  }
  next();
});
