const express = require("express");
const router = express.Router();
const {
  allDepartments,
  getDepartment,
  updateDepartment,
  addDepartment,
  deleteAllDepartments,
  deleteDepartment,
} = require("../../controller/dataController/departmentDataController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../../middlewares/authentication");

router.get("/", authenticateUser, allDepartments);
router.get("/:departmentId", authenticateUser, getDepartment);
router.post("/add", authenticateUser, addDepartment);
router.patch("/:departmentId", authenticateUser, updateDepartment);
router.delete(
  "/all",
  authenticateUser,
  authorizePermissions("admin"),
  deleteAllDepartments
);
router.delete(
  "/:departmentId",
  authenticateUser,
  authorizePermissions("admin"),
  deleteDepartment
);

module.exports = router;
