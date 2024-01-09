const express = require("express");
const router = express.Router();
const {
  allTeachers,
  getTeacher,
  updateTeacher,
  deleteAllTeachers,
  deleteTeacher,
} = require("../../controller/dataController/teacherDataController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../../middlewares/authentication");

router.get("/", authenticateUser, allTeachers);
router.get("/:teacherId", authenticateUser, getTeacher);
router.patch("/:teacherId", authenticateUser, updateTeacher);
router.delete("/all", authenticateUser, authorizePermissions("admin"), deleteAllTeachers);
router.delete("/:teacherId", authenticateUser,authorizePermissions("admin"), deleteTeacher);

module.exports = router;
