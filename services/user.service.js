const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");

// Service function to register a new user
exports.registerUser = async (username, email, password, role) => {
  // Validate input fields
  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new ApiError(409, "User with email already exists");
  }

  // Create the user in the database
  const createdUser = await User.create({
    username,
    email,
    password,
    role: role || "Player", // Default role if not provided
  });

  if (!createdUser) {
    throw new ApiError(500, "Failed to register user");
  }

  return createdUser;
};

// Service function to log in a user
exports.loginUser = async (email, password) => {
  // Find the user by email
  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    throw new ApiError(401, "User does not exist with this email");
  }

  // Validate password
  const isPasswordValid = await existingUser.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate access token
  const accessToken = existingUser.generateAccessToken();

  return { user: existingUser, accessToken };
};

// Service function to get user profile
exports.getUserProfile = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};
