const userService = require("../services/user.service");
const ApiResponse = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncErrorHandlerWrapper");

// Registration Logic
exports.register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  const createdUser = await userService.registerUser(
    username,
    email,
    password,
    role
  );
  res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

// Login logic
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken } = await userService.loginUser(email, password);

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, { user, accessToken }, "User logged in successfully")
    );
});

// Get user profile logic
exports.getProfile = asyncHandler(async (req, res) => {
  const user = await userService.getUserProfile(req.user.id);
  res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched successfully"));
});
