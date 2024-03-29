const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  sendOTP,
  changePassword,
  toggleActivation,
  adminPromotion
} = require("../../controller/authController/userAuthController");
const { authenticateUser, checkIfUserExists, authorizePermissions } = require("../../middlewares/authentication");
const { logActivity } = require("../../middlewares/log");

router.post("/register", logActivity("Registered New User"), register);
router.post("/login", sendOTP);
router.post("/login-otp", logActivity("Logged In"), login);
router.post("/verify-email", logActivity("Verified Email"), verifyEmail);
router.post("/forgot-password", logActivity("Forgot Password"), forgotPassword);
router.post("/reset-password", logActivity("Reset Password"), resetPassword);
router.post(
  "/change-password/:userId",
  authenticateUser,
  logActivity("Changed Password"),
  changePassword
);
router.post('admin-promotion/:userId', authenticateUser, authorizePermissions("admin"), adminPromotion)
router.delete("/logout", authenticateUser, logActivity("Logged Out"), logout);

module.exports = router;
