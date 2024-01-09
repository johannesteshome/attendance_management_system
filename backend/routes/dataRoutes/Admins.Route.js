const express = require("express");
const { allAdmins, getAdmin, updateAdmin, deleteAllAdmins, deleteAdmin } = require("../../controller/dataController/adminDataController");
const { authenticateUser, authorizePermissions } = require("../../middlewares/authentication");
const router = express.Router();

router.get("/", authenticateUser, authorizePermissions("admin", "teacher"), allAdmins);
router.get("/:adminId", authenticateUser, getAdmin);
router.patch("/:adminId", authenticateUser, updateAdmin);
router.delete("/all", authenticateUser, deleteAllAdmins);
router.delete("/:adminId", authenticateUser, deleteAdmin);

module.exports = router;
