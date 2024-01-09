const express = require("express");
const router = express.Router();
const {
  allCourses,
  getCourse,
  updateCourse,
  addCourse,
  deleteAllCourses,
  courseAssignment,
  deleteCourse,
} = require("../../controller/dataController/courseDataController");
const { authenticateUser, authorizePermissions } = require("../../middlewares/authentication");

router.get("/", authenticateUser, allCourses);
router.get("/:id", authenticateUser, getCourse);
router.post("/add", authenticateUser, addCourse);
router.patch("/:courseId", authenticateUser, updateCourse);
router.patch("/:courseId/assign", authenticateUser, authorizePermissions("admin"), courseAssignment);
router.delete("/all", authenticateUser, authorizePermissions("admin"), deleteAllCourses);
router.delete("/:courseId", authenticateUser, authorizePermissions("admin"), deleteCourse);

module.exports = router;
