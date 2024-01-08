const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword
} = require("../../controller/authController/adminAuthController");
const { authenticateUser } = require("../../middlewares/authentication");


router.post("/register", register);
router.post("/login", login)
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
router.delete("/logout", authenticateUser, logout);


module.exports = router;
