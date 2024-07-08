const userService = require("../../services/user.service");
const User = require("../../models/user.model");
const ApiError = require("../../utils/ApiError");

jest.mock("../../models/user.model");

describe("registerUser", () => {
  it("should register a new user", async () => {
    // Mock input data
    const username = "testuser";
    const email = "test@example.com";
    const password = "password";
    const role = "Player";

    // Mock User.create to return a created user
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      id: 1,
      username,
      email,
      role,
    });

    // Call the function
    const createdUser = await userService.registerUser(
      username,
      email,
      password,
      role
    );

    // Assertions
    expect(createdUser).toBeDefined();
    expect(createdUser.username).toBe(username);
    expect(createdUser.email).toBe(email);
    expect(createdUser.role).toBe(role);
  });

  it("should throw an error if user with email already exists", async () => {
    // Mock input data
    const username = "testuser";
    const email = "test@example.com";
    const password = "password";
    const role = "Player";

    // Mock User.findOne to simulate an existing user
    User.findOne.mockResolvedValue({
      id: 1,
      username,
      email,
      role,
    });

    // Call the function and expect it to throw ApiError
    await expect(
      userService.registerUser(username, email, password, role)
    ).rejects.toThrow(ApiError);
  });

  it("should throw an error if missing required fields", async () => {
    // Call the function without required fields
    await expect(userService.registerUser("", "", "", "")).rejects.toThrow(
      ApiError
    );
  });
});
