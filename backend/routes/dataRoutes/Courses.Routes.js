const express = require("express");
const router = express.Router();
const {
  allCourses,
  getCourse,
  updateCourse,
  addCourse,
  deleteAllCourses,
  deleteCourse,
} = require("../../controller/dataController/courseDataController");
const { authenticateUser } = require("../../middlewares/authentication");

router.get("/", authenticateUser, allCourses);
router.get("/:id", authenticateUser, getCourse);
router.post("/add", authenticateUser, addCourse);
router.patch("/:courseId", authenticateUser, updateCourse);
router.delete("/all", authenticateUser, deleteAllCourses);
router.delete("/:courseId", authenticateUser, deleteCourse);

module.exports = router;
