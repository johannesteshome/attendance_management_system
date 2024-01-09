const express = require("express");
const { allAdmins, getAdmin, updateAdmin, deleteAllAdmins, deleteAdmin } = require("../../controller/dataController/adminDataController");
const { authenticateUser, authorizePermissions } = require("../../middlewares/authentication");
const router = express.Router();

router.get("/", authenticateUser, authorizePermissions("admin"), allAdmins);
router.get("/:adminId", authenticateUser, authorizePermissions("admin"), getAdmin);
router.patch("/:adminId", authenticateUser, authorizePermissions("admin"), updateAdmin);
router.delete("/all", authenticateUser, authorizePermissions("admin"), deleteAllAdmins);
router.delete("/:adminId", authenticateUser, authorizePermissions("admin"), deleteAdmin);

module.exports = router;
