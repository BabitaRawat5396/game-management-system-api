const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyJWT } = require("../middleware/auth.middleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getProfile", verifyJWT, userController.getProfile);

module.exports = router;
