const express = require("express");
const router = express.Router();
const {allCourses, getCourse, updateCourse, addCourse, deleteAllCourses, deleteCourse} = require("../../controller/dataController/courseDataController");


router.get("/", allCourses);

router.get("/:id", getCourse);

router.post("/add", addCourse);

router.patch("/:courseId", updateCourse);

router.delete("/all", deleteAllCourses);

router.delete("/:courseId", deleteCourse);

module.exports = router;
