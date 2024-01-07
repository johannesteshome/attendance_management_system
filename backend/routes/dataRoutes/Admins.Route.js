const express = require("express");
const { allAdmins, getAdmin, updateAdmin, deleteAllAdmins, deleteAdmin } = require("../../controller/dataController/adminDataController");
const router = express.Router();

router.get("/", allAdmins);
router.get("/:adminId", getAdmin);
router.patch("/:adminId", updateAdmin);
router.delete("/all", deleteAllAdmins);
router.delete("/:adminId", deleteAdmin);

module.exports = router;
